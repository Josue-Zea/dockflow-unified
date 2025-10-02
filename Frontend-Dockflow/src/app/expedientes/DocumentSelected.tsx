import React, { useEffect, useState } from 'react';
import { Document as DocumentInterface } from '../interfaces/Document';
import { documentsService } from '../services/documentsService'
import TramitesFromDocument from './TramitesFromDocument';

interface DocumentProps {
  document: DocumentInterface;
  back: () => void;
}

const DocumentSelected = ({ document, back }: DocumentProps) => {
  const [pdfDocument, setPdfDocument] = useState<File | null>(null);

  const loadPdf = async () => {
    try {
      const token = localStorage.getItem("token");
      const pdfData = await documentsService.getExpedientePdf(
        `/expedientes/getExpediente`,
        { 'Authorization': `Bearer ${token}` },
        { numero_expediente: document.numero, anio_expediente: document.anio, watermark: false }
      )
      const arrayBuffer = await pdfData.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "application/pdf" });
      const file = new File([blob], "expediente.pdf", { type: "application/pdf" });

      setPdfDocument(file);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (document) {
      loadPdf();
    }
  }, [document])

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='font-bold text-lg mb-4'>Expediente: {document.numero}-{document.anio}</h1>
        <button
          type="button"
          className={`bg-gray-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4`}
          onClick={back}
        >
          Volver
        </button>
      </div>

      {pdfDocument && (
        <iframe
          src={URL.createObjectURL(pdfDocument)}
          style={{ width: "100%", height: "80vh" }}
          frameBorder="0"
          title="PDF Viewer"
        ></iframe>
      )}

      <TramitesFromDocument document={document} />
    </div>
  )
}

export default DocumentSelected