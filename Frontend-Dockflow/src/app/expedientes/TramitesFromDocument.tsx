import React, { useEffect, useRef, useState } from 'react';
import { Document } from '../interfaces/Document';
import { documentsService } from '../services/documentsService';
import { TypeTramite } from '../interfaces/TypeTramite';
import { Tramite } from '../interfaces/Tramite';
import { SmallIconAllert, YesNoAlert } from '../alerts/alerts.functions';

const TramitesFromDocument = ({ document }: { document: Document }) => {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [tramitesTypes, setTramitesTypes] = useState<TypeTramite[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTramiteType, setSelectedTramiteType] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [pdfDocument, setPdfDocument] = useState<File | null>(null);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadTramites = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await documentsService.getTramitesFromDocument(
        `/dockflow/getTramitesExpediente/${document.iddocumento}`,
        { Authorization: `Bearer ${token}` }
      );
      const data = await response.json();
      setTramites(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadTramitesTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await documentsService.getTramitesTypes(
        `/dockflow/getTramitesType`,
        { Authorization: `Bearer ${token}` }
      );
      setTramitesTypes(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
    setError("");
    setSuccess("");
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) setSelectedFile(file);
  };

  const validateForm = (): boolean => {
    if (!selectedFile) {
      setError("Debe seleccionar un archivo PDF.");
      return false;
    }
    if (selectedFile.type !== "application/pdf") {
      setError("El archivo debe ser un PDF (.pdf).");
      return false;
    }
    if (!selectedTramiteType) {
      setError("Debe seleccionar un tipo de trámite.");
      return false;
    }
    if (!nombre.trim()) {
      setError("Debe ingresar un nombre.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token") || "";
      const pdfbase64 = await documentsService.fileToBase64(selectedFile!);

      const body = {
        iddocumentoPadre: document.iddocumento,
        pdfbase64,
        nombre: nombre.trim(),
        fecha: new Date().toISOString(),
        tipotramite: selectedTramiteType,
      };

      const endpoint = "/dockflow/createTramite";
      const res = await documentsService.createTramite(endpoint, body, {
        Authorization: `Bearer ${token}`,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Error al crear el trámite");
      } else {
        await loadTramites();
        SmallIconAllert("success", "Trámite creado exitosamente");
      }

      setSuccess("Trámite agregado correctamente.");
      resetForm();
      setShowForm(false);
      await loadTramites();
    } catch (err: any) {
      setError(err?.message || "Error al crear el trámite");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSelectedTramiteType("");
    setNombre("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleViewDocument = async (iddocumento: string) => {
    try {
      const token = localStorage.getItem("token");
      const pdfData = await documentsService.getTramitePdf(
        `/dockflow/getTramitePdf/${iddocumento}`,
        { Authorization: `Bearer ${token}` }
      );

      const response = await pdfData.json();
      const base64string = response.data;

      const byteCharacters = atob(base64string);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const file = new File([byteArray], "document.pdf", { type: "application/pdf" });

      setPdfDocument(file);
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleDeleteTramite = async (idTramite: string, idDocumento: string) => {
    const resultAsking = await YesNoAlert(
      "warning",
      "¿Está seguro de eliminar este trámite?",
      "Esta acción no se puede deshacer."
    );
    if (!resultAsking) return;

    try {
      const token = localStorage.getItem("token");
      const response = await documentsService.deleteTramite(
        `/dockflow/deleteTramite/${idTramite}/${idDocumento}`,
        { Authorization: `Bearer ${token}` }
      );
      if (!response.ok) {
        SmallIconAllert("error", "Error al eliminar el trámite");
        return;
      }
      await loadTramites();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTramites();
    loadTramitesTypes();
  }, [document]);

  return (
    <div className="grid gap-3">
      <div className="flex justify-between items-center mt-4">
        <h3 className="m-0 text-lg font-semibold">Trámites del documento</h3>
        <button
          type="button"
          onClick={handleToggleForm}
          className="px-3 py-2 border border-blue-600 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cerrar formulario" : "Agregar trámite"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 p-3 border border-gray-200 rounded-md"
        >
          <div className="grid gap-1.5">
            <label className="font-semibold">Archivo PDF</label>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="border-2 border-dashed border-gray-400 p-4 rounded-md text-center bg-gray-50"
            >
              <p className="text-gray-500">
                Arrastra y suelta un PDF aquí, o selecciona uno
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="mt-2"
              />
              {selectedFile && (
                <small className="block mt-2 text-gray-600">
                  Seleccionado: {selectedFile.name}
                </small>
              )}
            </div>
          </div>

          <div className="grid gap-1.5">
            <label className="font-semibold">Tipo de trámite</label>
            <select
              value={selectedTramiteType}
              onChange={(e) => setSelectedTramiteType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="">Seleccione un tipo</option>
              {tramitesTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-1.5">
            <label className="font-semibold">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese un nombre"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {error && <div className="text-red-700">{error}</div>}
          {success && <div className="text-green-700">{success}</div>}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleToggleForm}
              className="px-3 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-100"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-3 py-2 border border-green-600 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {submitting ? "Guardando…" : "Guardar trámite"}
            </button>
          </div>
        </form>
      )}

      <div>
        {tramites.length === 0 ? (
          <p className="text-gray-500">No hay trámites asociados a este documento.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Fechade registro</th>
                <th className="border p-2 text-left">Tipo de Trámite</th>
                <th className="border p-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {tramites.map((tramite) => (
                <tr key={tramite.id}>
                  <td className="border p-2">{tramite.nombre}</td>
                  <td className="border p-2">{new Date(tramite.fecharegistro).toLocaleDateString()}</td>
                  <td className="border p-2">{tramitesTypes.find((t) => t.id === tramite.tipotramite)?.nombre}</td>
                  <td className="border p-2">
                    <button
                      className='px-2 py-1 border border-green-600 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'
                      onClick={() => handleViewDocument(tramite.id)}
                    >
                      Ver documento
                    </button>
                    <button
                      className='px-2 py-1 ml-1 border border-red-600 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
                      onClick={() => handleDeleteTramite(tramite.id, tramite.iddocumento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {
        pdfDocument && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setPdfDocument(null)} // cerrar al hacer click en el fondo
          >
            <div
              className="bg-white w-11/12 md:w-3/4 lg:w-1/2 h-4/5 rounded-md shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()} // evita que cierre si das click dentro
            >
              <div className="flex justify-between items-center p-2 border-b">
                <h4 className="m-0 text-lg font-semibold">Documento del Trámite</h4>
                <button
                  className="px-3 py-1 border border-red-600 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() => setPdfDocument(null)}
                >
                  Cerrar
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <iframe
                  src={URL.createObjectURL(pdfDocument)}
                  style={{ width: "100%", height: "80vh" }}
                  frameBorder="0"
                  title="PDF Viewer"
                ></iframe>
              </div>
            </div>
          </div>
        )
      }

      {loadingPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md shadow-lg">
            <p>Cargando documento...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TramitesFromDocument