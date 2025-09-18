import React, { useEffect, useRef, useState } from 'react'
import { Box } from '../interfaces/Box'
import QRCode from 'react-qr-code';
import { Document } from '../interfaces/Document';
import { DocumentsTable } from '../components/DocumentsTable';
import { useRouter } from 'next/navigation';

import CustomDropDown from '../components/CustomDropDown';
import { SmallIconAllert, YesNoAlert } from '../alerts/alerts.functions';
import { documentsService } from '../services/documentsService';
import { boxService } from '../services/boxService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const SelectedBox = ({ box, setSelectedBox }: BoxProps) => {
    const [availableDocuments, setAvailableDocuments] = useState<Document[]>([])
    const [isAddingDocument, setIsAddingDocument] = useState(false)
    const [selectedAddDocument, setSelectedAddDocument] = useState<Document | null>(null)
    const [documents, setDocuments] = useState<Document[]>([])
    const [pdfTab, setPdfTab] = useState(false)
    const pdfContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

    useEffect(() => {
        loadDocumentsFromBox()
    }, [])

    const generatePDF = () => {
        setPdfTab(true);
        setTimeout(async () => {
            const element = pdfContainerRef.current;
            if (element) {
                const canvas = await html2canvas(element);
                const imgData = canvas.toDataURL('image/png');

                const contentWidth = canvas.width;
                const contentHeight = canvas.height;

                const pdf = new jsPDF({
                    orientation: contentWidth > contentHeight ? 'landscape' : 'portrait',
                    unit: 'px',
                    format: [contentWidth, contentHeight]
                });

                pdf.addImage(imgData, 'PNG', 0, 0, contentWidth, contentHeight);
                pdf.save(`${box.nombre}.pdf`);

                setPdfTab(false);
            }
        }, 0);
    };

    const loadDocumentsFromBox = async () => {
        const token = localStorage.getItem("token");

        const response = await documentsService.getExpedientesFromCaja(`/dockflow/getExpedientesFromBox/${box.id}`, { 'Authorization': `Bearer ${token}` });
        if (response.status === 200) {
            const data: Document[] = await response.json();
            console.log(data)
            setDocuments(data);
        } else {
            SmallIconAllert("error", "Error al obtener los expedientes de la caja");
        }
    }

    const handleEdit = (id: string) => {
        alert(`Editar caja con id: ${id}`);
    };

    const handleDelete = async () => {
        const result = await YesNoAlert("warning", "¿Estas seguro que deseas eliminar esta caja", "Si deseas agregarla nuevamente tendrás que hacerlo manualmente", "Confirmar")

        if (!result) return
        const token = localStorage.getItem("token");

        const response = await boxService.deleteBox(
            `/dockflow/caja/${box.id}`,
            { 'Authorization': `Bearer ${token}` }
        );

        if (response.status === 200) {
            SmallIconAllert("success", "Caja eliminado correctamente");
            setSelectedBox(null)
        } else {
            SmallIconAllert("error", "Error al eliminar la caja");
        }
    };

    const handleBack = () => {
        if (localStorage.getItem('selectedBox')) {
            localStorage.removeItem('selectedBox')
            router?.push('/estantes');
        } else {
            setSelectedBox(null)
        }
    }

    const addDocumentToBox = async () => {
        setIsAddingDocument(true)
        const token = localStorage.getItem("token");

        const response = await documentsService.getAllExpedientes("/dockflow/getAllExpedientes", { 'Authorization': `Bearer ${token}` });
        if (response.status === 200) {
            const data: Document[] = await response.json();
            let newBoxs = data.filter(document => document.idcaja === null);
            setAvailableDocuments(newBoxs);
        } else {
            SmallIconAllert("error", "Error al obtener las cajas");
        }
    }

    const handleAddDocument = async () => {
        console.log(selectedAddDocument)
        const token = localStorage.getItem("token");
        const response = await documentsService.addDocumentBox(`/dockflow/caja/${box.id}/${selectedAddDocument?.iddocumento}`, { 'Authorization': `Bearer ${token}` });
        if (response.status === 200) {
            SmallIconAllert("success", "Expediente agregado a la caja correctamente");
            loadDocumentsFromBox();
            setIsAddingDocument(false);
        } else {
            SmallIconAllert("error", "Error al agregar la caja al estante");
        }
    }

    const handleReloadData = () => {
        loadDocumentsFromBox();
    }

    return (
        <div ref={pdfContainerRef} className="container mx-auto px-4 py-6">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Datos de la caja</h1>
                {
                    !pdfTab && (
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
                        >
                            Volver
                        </button>
                    )
                }
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-white rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">{box.nombre}</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className='flex flex-col items-center'>
                            <p className="text-xs text-center mb-2">Código QR de la caja</p>
                            <QRCode
                                id='QRCode'
                                value={`${box.id}`}
                                viewBox={`0 0 256 256`}
                                style={{ height: "auto", maxWidth: "50%", width: "100%" }}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            {
                                !pdfTab && (
                                    <>
                                        <button
                                            onClick={() => handleEdit(box.id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Editar caja
                                        </button>
                                        <button
                                            onClick={generatePDF}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Imprimir información de la caja
                                        </button>
                                    </>
                                )
                            }
                            {
                                !pdfTab && (
                                    <>
                                        {
                                            documents.length === 0 && (
                                                <button
                                                    onClick={() => handleDelete()}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                                >
                                                    Eliminar caja
                                                </button>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            {
                !pdfTab && (
                    <>
                        {
                            documents.length > 0 ? (
                                <div className="bg-white rounded-lg shadow-md mt-6">
                                    <h2 className="text-xl font-bold mb-4">Expedientes en la caja</h2>
                                    <DocumentsTable documents={documents} handleClickDocument={handleReloadData} />
                                </div>
                            ) : (
                                <p className="text-gray-500 mb-2">Aun no hay expedientes en la caja.</p>
                            )
                        }
                    </>
                )
            }

            {
                !pdfTab && (
                    <>
                        {
                            isAddingDocument ? (
                                <div className='w-full'>
                                    <div className='flex gap-2 items-center w-full'>
                                        <h5>Selecciona un expediente</h5>
                                        <CustomDropDown
                                            options={availableDocuments}
                                            text='Selecciona un expediente'
                                            optionName='numero'
                                            setOption={setSelectedAddDocument}
                                            multiName
                                            secondName='anio'
                                            width={150}
                                        />
                                    </div>
                                    {
                                        selectedAddDocument ? (
                                            <div className='flex flex-row mt-4 justify-end gap-2'>
                                                <button
                                                    onClick={handleAddDocument}
                                                    className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                                                >
                                                    Agregar expediente
                                                </button>
                                                <button
                                                    onClick={() => { setIsAddingDocument(false); setSelectedAddDocument(null) }}
                                                    className="px-4 py-2 bg-red-400 text-black rounded-lg hover:bg-red-300"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='flex flex-row mt-4 justify-end'>
                                                <button
                                                    onClick={() => { setIsAddingDocument(false); setSelectedAddDocument(null) }}
                                                    className="px-4 py-2 bg-red-400 text-black rounded-lg hover:bg-red-300"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className='flex flex-row mt-4 justify-end'>
                                    <button
                                        onClick={addDocumentToBox}
                                        className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                                    >
                                        Agregar expediente a la caja
                                    </button>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

interface BoxProps {
    box: Box
    setSelectedBox: (data: any) => void
}
