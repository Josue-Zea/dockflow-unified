import React from 'react'
import { Box } from '../interfaces/Box'
import { SmallIconAllert, YesNoAlert } from '../alerts/alerts.functions'
import { boxService } from '../services/boxService'

export const BoxTable = ({ boxs, clickBox, handleRemoveDocumentFromBox }: BoxListProps) => {

    const handleRemoveBoxFromShelf = async (box: Box) => {
        const result = await YesNoAlert("warning", "¿Estas seguro que deseas remover la caja de este estante?", "Si deseas agregarla nuevamente tendrás que hacerlo manualmente", "Confirmar")

        if (!result) return
        const token = localStorage.getItem("token");
        const response = await boxService.removeBoxFromShelf(
            `/estante/caja/${box.idestante}/${box.id}`,
            { 'Authorization': `Bearer ${token}` }
        )

        if (response.status === 200) {
            SmallIconAllert("success", "Caja removida del estante")
            handleRemoveDocumentFromBox()
        } else {
            SmallIconAllert("error", "Error al remover la caja de lestante")
        }
    }

    return (
        <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
                <tr>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Estante</th>
                    <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
            </thead>
            <tbody>
                {boxs.map((caja, index) => (
                    <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100 "
                        onClick={() => clickBox(caja)}
                    >
                        <td className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">{caja.nombre}</td>
                        {
                            caja.idestante !== null ? (
                                <td className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">{caja.idestante}</td>
                            ) : (
                                <td className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">Sin estante asignado</td>
                            )
                        }
                        <td className="py-2 px-4 border-b border-gray-200 hover:bg-gray-100">
                            {
                                caja.idestante && (
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-80 transition"
                                        onClick={() => handleRemoveBoxFromShelf(caja)}
                                    >
                                        Remover caja de estante
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

interface BoxListProps {
    boxs: Box[]
    clickBox: (box: any) => void,
    handleRemoveDocumentFromBox: () => void
}