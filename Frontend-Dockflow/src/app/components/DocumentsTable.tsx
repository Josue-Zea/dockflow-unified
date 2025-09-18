import React from 'react'
import { Document } from '../interfaces/Document'
import { SmallIconAllert, YesNoAlert } from '../alerts/alerts.functions'
import { documentsService } from '../services/documentsService'

export const DocumentsTable = ({ documents, handleClickDocument }: DocumentsTableProps) => {
    const handleRemoveDocumentFromBox = async (document: Document) => {
        const result = await YesNoAlert("warning", "¿Estas seguro que deseas remover el expediente de esta caja?", "Si deseas agregarlo nuevamente tendrás que hacerlo manualmente", "Confirmar")

        if (!result) return
        const token = localStorage.getItem("token");
        const response = await documentsService.removeDocumentToBox(
            `/dockflow/caja/removeExpediente/${document.iddocumento}`,
            { 'Authorization': `Bearer ${token}` }
        )

        if (response.status === 200) {
            SmallIconAllert("success", "Expediente removido de la caja")
            handleClickDocument()
        } else {
            SmallIconAllert("error", "Error al remover el expediente de la caja")
        }
    }

    return (
        <table className="table-auto w-full bg-white shadow-md rounded mb-4">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Número</th>
                    <th className="py-3 px-6 text-left">Año</th>
                    <th className="py-3 px-6 text-left">Fecha registro</th>
                    <th className="py-3 px-6 text-left">Caja asignada</th>
                    <th className="py-3 px-6 text-left"></th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {documents.map((document, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100 "
                    >
                        <td className="py-3 px-6 text-left whitespace-nowrap">{document.numero}</td>
                        <td className="py-3 px-6 text-left">{document.anio}</td>
                        <td className="py-3 px-6 text-left">{"11/11/2024"}</td>
                        <td className="py-3 px-6 text-left">{document.idcaja ?? "Sin caja"}</td>
                        <td className="py-3 px-6 text-left">
                            {
                                document.idcaja && (
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                                        onClick={() => handleRemoveDocumentFromBox(document)}
                                    >
                                        Quitar expediente de caja
                                    </button>
                                )
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

interface DocumentsTableProps {
    documents: Document[]
    handleClickDocument: () => void
}