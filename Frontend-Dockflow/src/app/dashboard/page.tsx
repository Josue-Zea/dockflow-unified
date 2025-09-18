"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MainLayout } from "../Layouts/MainLayout";
import { FaSave } from "react-icons/fa";
import "pdfjs-dist/build/pdf.worker.mjs";
import { Controller, useForm } from "react-hook-form";
import { CustomInput } from "../components/CustomInput";
import { documentsService } from "../services/documentsService";
import { BigIconAlert } from "../alerts/alerts.functions";
import { VALIDATIONS } from "../constants/VALIDATIONS";
import ScannerComponent from "./ScannerComponent";
import LoaderComponent from "./LoaderComponent";
import { TypeDocument } from "../interfaces/TypeDocument";
import { SubTypeDocument } from "../interfaces/SubTypeDocument";

// Configurar el worker

export default function Dashboard() {
  const { control, register, formState: { errors }, handleSubmit, unregister, setValue } = useForm()
  const [file, setFile] = useState<File | null>(null);
  const [b64string, setB64string] = useState("")
  const router = useRouter();
  const [types, setTypes] = useState<TypeDocument[]>([])
  const [subTypes, setSubTypes] = useState<SubTypeDocument[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // return
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    loadData();
  }, []);

  const loadData = async () => {
    const token = localStorage.getItem("token");
    const typesDB = await documentsService.get(
      "/expedientes/getTipoExpediente",
      { 'Authorization': `Bearer ${token}` }
    );
    setTypes(typesDB);
    const subTypesDB = await documentsService.get(
      "/expedientes/getSubtipoExpediente",
      { 'Authorization': `Bearer ${token}` }
    );
    setSubTypes(subTypesDB);
  }

  const [documentData, setDocumentData] = useState({
    scanDate: 'Pendiente...',
    fileSize: 'Pendiente...',
    fileFormat: 'Pendiente...',
  });

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === "application/pdf") {
        setFile(file);

        setDocumentData({
          scanDate: new Date().toLocaleDateString(),
          fileSize: `${(file.size / 1024).toFixed(2)} KB`,
          fileFormat: file.type,
        });
      } else {
        alert("Por favor, selecciona un archivo PDF.");
      }
    }
  };

  const base64ToBlob = (base64: string, mimeType = "application/pdf") => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  const loadBase64Pdf = (base64: string) => {
    setDocumentData({
      scanDate: new Date().toLocaleDateString(),
      fileSize: `${(base64.length / 1024).toFixed(2)} KB`,
      fileFormat: "application/pdf",
    });
    setB64string(base64)
    const blob = base64ToBlob(base64, "application/pdf");
    setFile(new File([blob], "document.pdf", { type: "application/pdf" }));
  };

  // Manejar el archivo arrastrado y soltado
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFile(file);
    } else {
      alert("Por favor, arrastra un archivo PDF.");
    }
  };

  // Prevenir el comportamiento por defecto cuando se arrastra
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleScanClick = async () => {
    handleSubmit(async (data) => {
      try {
        const token = localStorage.getItem("token");
        const headers = { 'Authorization': `Bearer ${token}` };
        const response = await documentsService.getExpediente(
          `/dockflow/getExpediente/${data.numeroExpediente}/${data.anioExpediente}`, headers);
        const res: Document[] = await response.json();
        if (res.length > 0) {
          BigIconAlert(
            'error',
            'Error',
            `El expediente ${data.numeroExpediente}-${data.anioExpediente} ya existe`,
            'center'
          );
          return;
        }

        const body = {
          numero_expediente: data.numeroExpediente,
          anio_expediente: data.anioExpediente,
          idtipo: data.type,
          idsubtipo: data.subType,
          numerotramite: 1,
          file: file!,
          fileBase64: b64string,
        };
        const code = await documentsService.createExpediente('/expedientes/createExpediente', body);
        if (code === 200) {
          BigIconAlert(
            'success',
            'Exito',
            `Se ha creado el expediente ${data.numeroExpediente}-${data.anioExpediente}`,
            'center'
          );
        } else {
          BigIconAlert(
            'error',
            'Error',
            `Ha ocurrido un error al crear el expediente ${data.numeroExpediente}-${data.anioExpediente}`,
            'center'
          );
        }
      } catch (err: any) {
        BigIconAlert(
          'error',
          'Error',
          `Error al enviar el documento: ${err.message}`,
          'center'
        );
      }
    })();
  };

  return (
    <MainLayout>
      <div className="container mx-auto my-10">
        {isLoading && <LoaderComponent />}
        {/* Header */}
        <ScannerComponent setLoader={setIsLoading} loadBase64Pdf={loadBase64Pdf} />

        {/* Scan Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Subir Documento</h2>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex justify-center items-center cursor-pointer"
            onClick={() => document.getElementById("fileInput")?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <span className="text-gray-500">
              {file ? (
                <span>Archivo cargado: {file.name}</span>
              ) : (
                "Arrastra y suelta tu documento aquí o haz clic para subirlo"
              )}
            </span>
            <input
              type="file"
              className="hidden"
              id="fileInput"
              accept=".pdf"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Metadata Display Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Detalles del Documento Escaneado</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold">Fecha del registro:</label>
              <p className="text-gray-800">{documentData.scanDate}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Tamaño del Archivo:</label>
              <p className="text-gray-800">{documentData.fileSize}</p>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Formato:</label>
              <p className="text-gray-800">{documentData.fileFormat}</p>
            </div>
          </div>

          {/* Document Preview */}
          {file !== null && (
            <div className="mt-8">
              <div className="flex gap-2 mb-2">
                <CustomInput
                  type="text"
                  placeHolder="Número del expediente"
                  formField="numeroExpediente"
                  register={register}
                  validations={VALIDATIONS.documentNumberValidation}
                  errors={errors}
                />
                <CustomInput
                  type="text"
                  placeHolder="Año del expediente"
                  formField="anioExpediente"
                  register={register}
                  validations={VALIDATIONS.yearDocumentValidarion}
                  errors={errors}
                />
              </div>
              <div className="flex w-full gap-2 mb-2">
                {/* Campo Tipo */}
                <div className="w-full">
                  <label className="block mb-2 font-semibold">Tipo</label>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={types[0].id}
                    render={({ field }) => (
                      <select {...field} className="w-full p-2 rounded border border-gray-300 text-gray-900">
                        {
                          types.map((item) =>
                            <option key={item.id} value={item.id}>{item.nombre}</option>
                          )
                        }
                      </select>
                    )}
                  />
                  {errors.type && <p className="text-red-400 font-bold text-sm mt-1">{`${errors.type.message}`}</p>}
                </div>
                {/* Campo Subtipo */}
                <div className="w-full">
                  <label className="block mb-2 font-semibold">Tipo</label>
                  <Controller
                    name="subType"
                    control={control}
                    rules={{
                      required: "El sub tipo es obligatorio",
                    }}
                    defaultValue={subTypes[0].id}
                    render={({ field }) => (
                      <select {...field} className="w-full p-2 rounded border border-gray-300 text-gray-900">
                        {
                          subTypes.map((item) =>
                            <option key={item.id} value={item.id}>{item.nombre}</option>
                          )
                        }
                      </select>
                    )}
                  />
                  {errors.type && <p className="text-red-400 font-bold text-sm mt-1">{`${errors.type.message}`}</p>}
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Vista previa del Documento:</label>
                <button
                  onClick={handleScanClick}
                  className="flex flex-row items-center gap-2 bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-700"
                >
                  Guardar documento <FaSave />
                </button>
              </div>
            </div>
          )}
          {file && (
            <iframe
              // src={`${URL.createObjectURL(file)}#toolbar=0`} // Si queremos quitar la barra superior
              src={URL.createObjectURL(file)}
              style={{ width: "100%", height: "80vh" }}
              frameBorder="0"
              title="PDF Viewer"
            ></iframe>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
