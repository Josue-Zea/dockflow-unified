import React, { useEffect, useRef, useState } from 'react'
import { Shelf } from '../interfaces/Shelf';
import QRCode from "react-qr-code";
import { Box } from '../interfaces/Box';
import { BoxTable } from '../cajas/BoxTable';
import { useRouter } from 'next/navigation'
import { shelfsService } from '../services/shelfsService';
import { SmallIconAllert, YesNoAlert } from '../alerts/alerts.functions';
import { boxService } from '../services/boxService';
import CustomDropDown from '../components/CustomDropDown';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const SelectedShelf = ({ shelf, setSelectedShelf }: ShelfProps) => {
    const [boxs, setBoxs] = useState<Box[]>([])
    const [availableBox, setAvailableBox] = useState<Box[]>([])
    const [isAddingBox, setIsAddingBox] = useState(false)
    const [selectedAddBox, setSelectedAddBox] = useState<Box | null>(null)
    const [pdfTab, setPdfTab] = useState(false)
    const pdfContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter()

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
                pdf.save(`${shelf.nombre}.pdf`);

                setPdfTab(false);
            }
        }, 0);
    };

    const handleEdit = (id: string) => {
        alert(`Editar estante con id: ${id}`);
    };

    const handleDelete = async () => {
        const result = await YesNoAlert("warning", "¿Estas seguro que deseas eliminar este estante", "Si deseas agregarlo nuevamente tendrás que hacerlo manualmente", "Confirmar")

        if (!result) return
        const token = localStorage.getItem("token");

        const response = await shelfsService.deleteShelf(
            `/dockflow/estante/${shelf.id}`,
            { 'Authorization': `Bearer ${token}` }
        );

        if (response.status === 200) {
            SmallIconAllert("success", "Estante eliminado correctamente");
            setSelectedShelf(null)
        } else {
            SmallIconAllert("error", "Error al eliminar el estante");
        }
    };

    const handleClickBox = (box: Box) => {
        localStorage.setItem('selectedBox', JSON.stringify(box))
        router?.push('/cajas');
    }

    const handleBack = () => {
        localStorage.removeItem('selectedShelf')
        setSelectedShelf(null)
    }

    useEffect(() => {
        loadBoxsFromActualShelf();
    }, [])

    const loadBoxsFromActualShelf = async () => {
        const token = localStorage.getItem("token");

        const newBoxs = await shelfsService.getBoxFromShelf(
            `/dockflow/getCajas/${shelf.id}`,
            { 'Authorization': `Bearer ${token}` }
        );

        if (newBoxs.status === 200) {
            const data = await newBoxs.json();
            setBoxs(data)
        } else {
            SmallIconAllert("error", "Error al obtener las cajas de este estante");
        }
    }

    const handleAddBox = async () => {
        setIsAddingBox(true)
        const token = localStorage.getItem("token");

        const response = await boxService.getAllBox("/dockflow/getCajas", { 'Authorization': `Bearer ${token}` });
        if (response.status === 200) {
            const data: Box[] = await response.json();
            let newBoxs = data.filter(box => box.idestante === null);
            setAvailableBox(newBoxs);
        } else {
            SmallIconAllert("error", "Error al obtener las cajas");
        }
    }

    const addBoxToshelf = async () => {
        const response = await shelfsService.addBoxToShelf(`/dockflow/caja/${selectedAddBox!.id}`,
            { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            { idEstante: shelf.id }
        )
        if (response.status === 200) {
            SmallIconAllert("success", "Caja agregada al estante correctamente");
            loadBoxsFromActualShelf();
            setIsAddingBox(false);
        } else {
            SmallIconAllert("error", "Error al agregar la caja al estante");
        }
    }

    const handleRemoveBoxFromShelf = async () => {
        loadBoxsFromActualShelf()
    }

    return (
        <div ref={pdfContainerRef} className="container mx-auto px-4 py-6">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Datos del estante</h1>
                {
                    !pdfTab && (
                        <button
                            onClick={() => handleBack()}
                            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
                        >
                            Volver
                        </button>
                    )
                }
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div key={shelf.id} className="p-4 bg-white rounded-lg flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">{shelf.nombre}</h2>
                        <p><strong>Eje X:</strong> {shelf.ejex}</p>
                        <p><strong>Eje Y:</strong> {shelf.ejey}</p>
                        <p><strong>Eje Z:</strong> {shelf.ejez}</p>
                        <p><strong>Alto:</strong> {shelf.alto}</p>
                        <p><strong>Ancho:</strong> {shelf.ancho}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className='flex flex-col items-center'>
                            <p className="text-xs text-center mb-2">Código QR del estante</p>
                            <QRCode
                                id='QRCode'
                                value={`${shelf.id}`}
                                viewBox={`0 0 256 256`}
                                style={{ height: "auto", maxWidth: "50%", width: "100%" }}
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            {
                                !pdfTab && (
                                    <>
                                        <button
                                            onClick={() => handleEdit(shelf.id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Editar estante
                                        </button>
                                        <button
                                            onClick={generatePDF}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Imprimir información del estante
                                        </button>
                                    </>
                                )
                            }
                            {
                                boxs.length === 0 && !pdfTab && (
                                    <button
                                        onClick={() => handleDelete()}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Eliminar estante
                                    </button>
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
                            boxs.length > 0 ? (
                                <div className='flex flex-col'>
                                    <h2 className="text-xl font-bold mb-4">Cajas del estante</h2>
                                    <BoxTable boxs={boxs} clickBox={handleClickBox} handleRemoveDocumentFromBox={handleRemoveBoxFromShelf} />
                                </div>
                            ) : (
                                <div className='flex flex-col'>
                                    <h2 className="text-xl font-bold mb-4">Este estante aun no tiene cajas asignadas</h2>
                                </div>
                            )
                        }
                    </>
                )
            }

            {
                !pdfTab && (
                    <>
                        {
                            isAddingBox ? (
                                <div>
                                    <div className='flex gap-2 mt-4 items-center'>
                                        <h5>Selecciona una caja</h5>
                                        <CustomDropDown
                                            options={availableBox}
                                            text='Selecciona una caja'
                                            optionName='nombre'
                                            setOption={setSelectedAddBox}
                                            width={250}
                                        />
                                    </div>
                                    {
                                        selectedAddBox ? (
                                            <div className='flex flex-row mt-4 justify-end gap-2'>
                                                <button
                                                    onClick={addBoxToshelf}
                                                    className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                                                >
                                                    Agregar caja
                                                </button>
                                                <button
                                                    onClick={() => { setIsAddingBox(false); setSelectedAddBox(null) }}
                                                    className="px-4 py-2 bg-red-400 text-black rounded-lg hover:bg-red-300"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='flex flex-row mt-4 justify-end'>
                                                <button
                                                    onClick={() => { setIsAddingBox(false); setSelectedAddBox(null) }}
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
                                        onClick={handleAddBox}
                                        className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                                    >
                                        Agregar caja a estante
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

interface ShelfProps {
    shelf: Shelf
    setSelectedShelf: (data: any) => void
}
