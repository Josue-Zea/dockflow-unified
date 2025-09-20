import React, { useEffect, useRef, useState } from "react";
import { Box } from "../interfaces/Box";
import { Document } from "../interfaces/Document";
import { DocumentsTable } from "../components/DocumentsTable";
import { useRouter } from "next/navigation";
import CustomDropDown from "../components/CustomDropDown";
import { SmallIconAllert, YesNoAlert } from "../alerts/alerts.functions";
import { documentsService } from "../services/documentsService";
import { boxService } from "../services/boxService";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const SelectedBox = ({ box, setSelectedBox }: BoxProps) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [availableDocuments, setAvailableDocuments] = useState<Document[]>([]);
    const [isAddingDocument, setIsAddingDocument] = useState(false);
    const [selectedAddDocument, setSelectedAddDocument] = useState<Document | null>(null);
    const [pdfTab, setPdfTab] = useState(false);

    const pdfContainerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    useEffect(() => {
        reloadDocuments();
    }, []);

    const reloadDocuments = async () => {
        const token = localStorage.getItem("token");
        const response = await documentsService.getExpedientesFromCaja(
            `/dockflow/getExpedientesFromBox/${box.id}`,
            { Authorization: `Bearer ${token}` }
        );

        if (response.status === 200) {
            const data: Document[] = await response.json();
            setDocuments(data);
        } else {
            SmallIconAllert("error", "Error al obtener los expedientes de la caja");
        }
    };

    const generatePDF = () => {
        setPdfTab(true);
        setTimeout(async () => {
            const element = pdfContainerRef.current;
            if (!element) return;

            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");
            const { width, height } = canvas;

            const pdf = new jsPDF({
                orientation: width > height ? "landscape" : "portrait",
                unit: "px",
                format: [width, height],
            });

            pdf.addImage(imgData, "PNG", 0, 0, width, height);
            pdf.save(`${box.nombre}.pdf`);
            setPdfTab(false);
        }, 0);
    };

    const deleteBox = async () => {
        const confirm = await YesNoAlert(
            "warning",
            "¿Eliminar esta caja?",
            "Si deseas agregarla nuevamente tendrás que hacerlo manualmente",
            "Confirmar"
        );

        if (!confirm) return;
        const token = localStorage.getItem("token");
        const response = await boxService.deleteBox(`/dockflow/caja/${box.id}`, {
            Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
            SmallIconAllert("success", "Caja eliminada correctamente");
            setSelectedBox(null);
        } else {
            SmallIconAllert("error", "Error al eliminar la caja");
        }
    };

    const goBack = () => {
        if (localStorage.getItem("selectedBox")) {
            localStorage.removeItem("selectedBox");
            router.push("/estantes");
        } else {
            setSelectedBox(null);
        }
    };

    const startAddDocument = async () => {
        setIsAddingDocument(true);
        const token = localStorage.getItem("token");
        const response = await documentsService.getAllExpedientes("/dockflow/getAllExpedientes", {
            Authorization: `Bearer ${token}`,
        });

        if (response.status === 200) {
            const data: Document[] = await response.json();
            setAvailableDocuments(data.filter((doc) => doc.idcaja === null));
        } else {
            SmallIconAllert("error", "Error al obtener expedientes disponibles");
        }
    };

    const confirmAddDocument = async () => {
        console.log("Adding document:", selectedAddDocument);
        if (!selectedAddDocument) return;

        const token = localStorage.getItem("token");
        const response = await documentsService.addDocumentBox(
            `/dockflow/caja_expediente/${box.id}/${selectedAddDocument.iddocumento}`,
            { Authorization: `Bearer ${token}` }
        );

        if (response.status === 200) {
            SmallIconAllert("success", "Expediente agregado a la caja correctamente");
            reloadDocuments();
            setIsAddingDocument(false);
            setSelectedAddDocument(null);
        } else {
            SmallIconAllert("error", "Error al agregar expediente");
        }
    };

    return (
        <div ref={pdfContainerRef} className="container mx-auto px-4 py-6">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Datos de la caja</h1>
                {!pdfTab && (
                    <button
                        onClick={goBack}
                        className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
                    >
                        Volver
                    </button>
                )}
            </div>

            <div className="p-4 bg-white rounded-lg flex justify-between items-center">
                <h2 className="text-lg font-semibold">{box.nombre}</h2>

                <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-center mb-2">Código QR</p>
                        <QRCode
                            value={`${box.id}`}
                            viewBox="0 0 256 256"
                            style={{ height: "auto", maxWidth: "50%", width: "100%" }}
                        />
                    </div>

                    {!pdfTab && (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={generatePDF}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Imprimir información
                            </button>
                            {documents.length === 0 && (
                                <button
                                    onClick={deleteBox}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Eliminar caja
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {!pdfTab && (
                <div className="mt-6">
                    {documents.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-xl font-bold mb-4">Expedientes en la caja</h2>
                            <DocumentsTable documents={documents} handleClickDocument={reloadDocuments} />
                        </div>
                    ) : (
                        <p className="text-gray-500">Aún no hay expedientes en la caja.</p>
                    )}
                </div>
            )}

            {!pdfTab && (
                <div className="mt-6 flex justify-end">
                    {isAddingDocument ? (
                        <div className="w-full">
                            <div className="flex w-full gap-2 items-center">
                                <h5>Selecciona un expediente</h5>
                                <CustomDropDown
                                    options={availableDocuments}
                                    text="Selecciona un expediente"
                                    optionName="numero"
                                    setOption={setSelectedAddDocument}
                                    multiName
                                    secondName="anio"
                                    width={300}
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                {selectedAddDocument && (
                                    <button
                                        onClick={confirmAddDocument}
                                        className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                                    >
                                        Agregar expediente
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setIsAddingDocument(false);
                                        setSelectedAddDocument(null);
                                    }}
                                    className="px-4 py-2 bg-red-400 text-black rounded-lg hover:bg-red-300"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={startAddDocument}
                            className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300"
                        >
                            Agregar expediente a la caja
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

interface BoxProps {
    box: Box;
    setSelectedBox: (data: any) => void;
}
