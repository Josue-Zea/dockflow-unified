const fs = require('fs/promises');
const path = require('path');
const { FILES_CONFIG } = require('../config/config');

// Keep filename as provided. If missing extension, leave it as-is.
const ensureHasExtension = (name) => {
  if (!name || typeof name !== 'string') return name;
  const hasDot = /\.[^./\\]+$/.test(name);
  return hasDot ? name : name; // do not force any extension
};

const sanitizeSegment = (segment = '') => segment
  .replace(/\\/g, '')
  .replace(/\//g, '')
  .replace(/\s+/g, ' ')
  .trim();

// Sanitize a single folder segment, allowing subfolders in documentType.
const sanitizeFolderSegment = (segment = '') => {
  // basic trim and collapse spaces
  let seg = String(segment || '').replace(/\\/g, '').replace(/\//g, '').replace(/\s+/g, ' ').trim();
  if (!seg) return null;
  // disallow current/parent refs
  if (seg === '.' || seg === '..') return null;
  // remove characters invalid on Windows folder names: <> : " / \ | ? * and control chars
  seg = seg.replace(/[<>:\"\\/\|\?\*\x00-\x1F]/g, '');
  // Trim again
  seg = seg.trim();
  if (!seg) return null;
  // disallow reserved names
  if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(seg)) return null;
  // disallow leading/trailing spaces or dots
  if (/^[ .]|[ .]$/.test(seg)) return null;
  // length guard
  if (seg.length > 255) return null;
  return seg;
};

const sanitizeFileName = (name = '') => {
  // preserve extension if any, but sanitize each part
  const raw = String(name || '').trim();
  const lastDot = raw.lastIndexOf('.');
  if (lastDot > 0) {
    const base = raw.slice(0, lastDot);
    const ext = raw.slice(lastDot + 1);
    const safeBase = sanitizeSegment(base).replace(/[^a-zA-Z0-9._ -]/g, '');
    const safeExt = sanitizeSegment(ext).replace(/[^a-zA-Z0-9]/g, '');
    return `${safeBase}.${safeExt}`;
  }
  return sanitizeSegment(raw).replace(/[^a-zA-Z0-9._ -]/g, '');
};

const buildFilePath = (documentType, documentName) => {
  // Allow documentType to contain subfolders separated by '/' or '\\'
  const raw = documentType || 'default';
  const parts = String(raw).split(/[\\/]+/).map(p => p.trim()).filter(Boolean);
  const safeParts = parts.map(p => sanitizeFolderSegment(p)).filter(Boolean);
  if (!safeParts || safeParts.length === 0) {
    throw new Error('INVALID_FOLDER');
  }

  const safeFileName = sanitizeFileName(ensureHasExtension(documentName));
  if (!safeFileName) {
    throw new Error('INVALID_FILENAME');
  }

  const folderPath = path.join(FILES_CONFIG.BASE_PATH, ...safeParts);
  const filePath = path.join(folderPath, safeFileName);
  return { folderPath, filePath };
};

const extractBase64Payload = (encoded) => {
  if (!encoded) return encoded;
  const parts = String(encoded).split(',');
  return parts.length > 1 ? parts.pop().trim() : String(encoded).trim();
};

const saveDocument = async (req, res) => {
  try {
    // Accept either pdfBase64 or fileBase64 for backward compatibility
    const { pdfBase64, fileBase64, documentName, documentType } = req.body || {};
    const base64payload = pdfBase64 || fileBase64;

    if (!base64payload || !documentName || !documentType) {
      return res.status(400).json({
        message: 'fileBase64 (o pdfBase64), documentName y documentType son obligatorios',
      });
    }

    let folderPath;
    let filePath;
    try {
      ({ folderPath, filePath } = buildFilePath(documentType, documentName));
    } catch (pathError) {
      if (pathError.message === 'INVALID_FOLDER' || pathError.message === 'INVALID_FILENAME') {
        return res.status(400).json({
          message: 'Nombre de documento o tipo inválido',
        });
      }
      throw pathError;
    }
    await fs.mkdir(folderPath, { recursive: true });
    const buffer = Buffer.from(extractBase64Payload(base64payload), 'base64');
    await fs.writeFile(filePath, buffer);

    return res.status(201).json({
      message: 'Documento guardado correctamente',
      path: filePath,
      absolutePath: filePath,
    });
  } catch (error) {
    console.error('Error al guardar el documento:', error);
    return res.status(500).json({
      message: 'Error al guardar el documento',
    });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { documentName, documentType } = req.params || {};

    if (!documentName || !documentType) {
      return res.status(400).json({
        message: 'documentName y documentType son obligatorios',
      });
    }

    let filePath;
    try {
      ({ filePath } = buildFilePath(documentType, documentName));
    } catch (pathError) {
      if (pathError.message === 'INVALID_FOLDER' || pathError.message === 'INVALID_FILENAME') {
        return res.status(400).json({
          message: 'Nombre de documento o tipo inválido',
        });
      }
      throw pathError;
    }

    try {
      await fs.unlink(filePath);
    } catch (fileError) {
      if (fileError.code === 'ENOENT') {
        return res.status(404).json({
          message: 'Documento no encontrado',
        });
      }
      throw fileError;
    }

    return res.status(200).json({
      message: 'Documento eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    return res.status(500).json({
      message: 'Error al eliminar el documento',
    });
  }
};

const getDocument = async (req, res) => {
  try {
    const { documentName, documentType } = req.params || {};

    if (!documentName || !documentType) {
      return res.status(400).json({
        message: 'documentName y documentType son obligatorios',
      });
    }

    let filePath;
    try {
      ({ filePath } = buildFilePath(documentType, documentName));
    } catch (pathError) {
      if (pathError.message === 'INVALID_FOLDER' || pathError.message === 'INVALID_FILENAME') {
        return res.status(400).json({
          message: 'Nombre de documento o tipo inválido',
        });
      }
      throw pathError;
    }

    let buffer;
    try {
      buffer = await fs.readFile(filePath);
    } catch (fileError) {
      if (fileError.code === 'ENOENT') {
        return res.status(404).json({
          message: 'Documento no encontrado',
        });
      }
      throw fileError;
    }

    return res.status(200).json({
      documentName: sanitizeFileName(ensureHasExtension(documentName)),
      documentType: sanitizeSegment(documentType),
      fileBase64: buffer.toString('base64'),
      absolutePath: filePath,
    });
  } catch (error) {
    console.error('Error al obtener el documento:', error);
    return res.status(500).json({
      message: 'Error al obtener el documento',
    });
  }
};

module.exports = {
  saveDocument,
  deleteDocument,
  getDocument,
};
