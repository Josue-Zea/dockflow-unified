const fs = require('fs/promises');
const path = require('path');
const { FILES_CONFIG } = require('../config/config');

const ensurePdfExtension = (name) => {
  if (!name.toLowerCase().endsWith('.pdf')) {
    return `${name}.pdf`;
  }
  return name;
};

const sanitizeSegment = (segment = '') => segment
  .replace(/\\/g, '')
  .replace(/\//g, '')
  .replace(/\s+/g, ' ')
  .trim();

const sanitizeFileName = (name = '') => sanitizeSegment(name).replace(/[^a-zA-Z0-9._ -]/g, '');

const buildFilePath = (documentType, documentName) => {
  const safeFolder = sanitizeSegment(documentType || 'default');
  if (!safeFolder) {
    throw new Error('INVALID_FOLDER');
  }

  const safeFileName = sanitizeFileName(ensurePdfExtension(documentName));
  if (!safeFileName) {
    throw new Error('INVALID_FILENAME');
  }

  const folderPath = path.join(FILES_CONFIG.BASE_PATH, safeFolder);
  const filePath = path.join(folderPath, safeFileName);
  return { folderPath, filePath };
};

const extractBase64Payload = (encoded) => {
  if (!encoded) {
    return encoded;
  }
  const parts = encoded.split(',');
  return parts.length > 1 ? parts.pop().trim() : encoded.trim();
};

const saveDocument = async (req, res) => {
  try {
    const { pdfBase64, documentName, documentType } = req.body || {};

    if (!pdfBase64 || !documentName || !documentType) {
      return res.status(400).json({
        message: 'pdfBase64, documentName y documentType son obligatorios',
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
    const buffer = Buffer.from(extractBase64Payload(pdfBase64), 'base64');
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
      documentName: sanitizeFileName(ensurePdfExtension(documentName)),
      documentType: sanitizeSegment(documentType),
      pdfBase64: buffer.toString('base64'),
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
