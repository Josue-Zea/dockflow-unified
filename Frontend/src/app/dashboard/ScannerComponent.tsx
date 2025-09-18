import React, { useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { documentsService } from "../services/documentsService";
import { SmallIconAllert, YesNoAlert } from "../alerts/alerts.functions";
import { generateUUID } from "../utils/utils";

interface ScannerComponentProps {
    loadBase64Pdf: (base64: string) => void;
    setLoader: (loading: boolean) => void;
}

const ScannerComponent = ({ loadBase64Pdf, setLoader }: ScannerComponentProps) => {
    const [fillForm, setFillForm] = useState(false)
    const [botonScanText, setBotonScanText] = useState("Escanear Documento")
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            dpi: 150,
            type: 1,
            duplex: 1
        },
    });

    const handleUseScanner = async (data: any) => {
        setLoader(true);
        try {

            const { dpi, type, duplex } = data;

            const uniqueId = generateUUID();
            
            const response = await documentsService.scanDocument(dpi, type, duplex, uniqueId);
            if(response.status !== 200){
                SmallIconAllert("error", "Error al intentar escanear documento");
                return
            }
            const result = await response.json();
            if (result.PdfBase64) {
                loadBase64Pdf(result.PdfBase64);
            }
            setBotonScanText("Escanear Documento");
            setFillForm(false);
        } catch (err: any) {
            setBotonScanText("Reintentar Escaneo");
            console.log(err)
            SmallIconAllert("error", "Error al intentar escanear documento");
        } finally {
            setLoader(false);
        }
    };

    const handleScan = async () => {
        const result = await YesNoAlert("warning", "¿Estas seguro que deseas escanear el documento?", "Este proceso puede tardar", "Confirmar")
        if (!result) return

        setLoader(true);
        try {
            const uniqueId = generateUUID();
            
            const response = await documentsService.scanDocument(150, 1, 1, uniqueId);
            if(response.status !== 200){
                SmallIconAllert("error", "Error al intentar escanear documento");
                return
            }
            const result = await response.json();
            if (result.PdfBase64) {
                loadBase64Pdf(result.PdfBase64);
            }
            setBotonScanText("Escanear Documento");
        } catch (err: any) {
            console.log(err)
            SmallIconAllert("error", "Error al intentar escanear documento");
        } finally {
            setLoader(false);
        }
    }

    return (
        <div className="bg-blue-600 p-6 rounded-lg shadow-md text-white flex flex-col gap-6">
            {/* Encabezado */}
            <div>
                <h1 className="text-2xl font-bold">Escáner de Documentos</h1>
                <p>Sube tu documento o escanéalo para ver sus detalles.</p>
            </div>

            {/* Contenido condicional */}
            {fillForm ? (
                <form onSubmit={handleSubmit(handleUseScanner)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo DPI */}
                    <div>
                        <label className="block mb-2 font-semibold">DPI</label>
                        <Controller
                            name="dpi"
                            control={control}
                            rules={{
                                required: "El DPI es obligatorio",
                                validate: (value) => {
                                    const numericValue = Number(value); // Convertir a número
                                    return [100, 150, 200].includes(numericValue) || "DPI inválido (100, 150, 200)";
                                },
                            }}
                            // disabled={true}
                            defaultValue={150}
                            render={({ field }) => (
                                <select {...field} className="w-full p-2 rounded border border-gray-300 text-gray-900">
                                    <option value="100">100</option>
                                    {/* <option value="150">150</option>
                                    <option value="200">200</option> */}
                                </select>
                            )}
                        />
                        {errors.dpi && <p className="text-red-400 font-bold text-sm mt-1">{errors.dpi.message}</p>}
                    </div>

                    {/* Campo Tipo */}
                    <div>
                        <label className="block mb-2 font-semibold">Tipo</label>
                        <Controller
                            name="type"
                            control={control}
                            // disabled={true}
                            defaultValue={1}
                            rules={{
                                required: "El tipo es obligatorio",
                                validate: (value) => {
                                    const numericValue = Number(value); // Convertir a número
                                    return [1, 2, 3].includes(numericValue) || "Tipo inválido (Escala de grises, Blanco y negro, Color)";
                                },
                            }}
                            render={({ field }) => (
                                <select {...field} className="w-full p-2 rounded border border-gray-300 text-gray-900">
                                    <option value="1">Escala de grises</option>
                                    {/* <option value="2">Blanco y negro</option>
                                    <option value="3">Color</option> */}
                                </select>
                            )}
                        />
                        {errors.type && <p className="text-red-400 font-bold text-sm mt-1">{errors.type.message}</p>}
                    </div>

                    {/* Campo Duplex */}
                    <div>
                        <label className="block mb-2 font-semibold">Escaneo dúplex</label>
                        <Controller
                            name="duplex"
                            control={control}
                            rules={{
                                required: "El dúplex es obligatorio",
                                validate: (value) => {
                                    const numericValue = Number(value); // Convertir a número
                                    return [0, 1].includes(numericValue) || "Valor inválido (No o Si)";
                                },
                            }}
                            defaultValue={1}
                            // disabled={true}
                            render={({ field }) => (
                                <select {...field} className="w-full p-2 rounded border border-gray-300 text-gray-900">
                                    {/* <option value="0">No</option> */}
                                    <option value="1">Si</option>
                                </select>
                            )}
                        />
                        {errors.duplex && <p className="text-red-400 font-bold text-sm mt-1">{errors.duplex.message}</p>}
                    </div>

                    {/* Botón de envío */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-200"
                        >
                            {botonScanText}
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    type="button"
                    className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-200 self-end"
                    onClick={() => handleScan()}
                >
                    Escanear Documento
                </button>
            )}
        </div>
    );
};

export default ScannerComponent;
