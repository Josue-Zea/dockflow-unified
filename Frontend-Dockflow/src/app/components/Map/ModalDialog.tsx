import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { Fragment } from "react";
import ShelvesMapController from "../../controller/ShelvesMapController";


import GeneralButton from "./GeneralButton";

interface ModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}




function ModalDialog({ isOpen, onClose, data }: ModalDialogProps) {

  const [expedientsOfBox, setExpedientsOfBox] = useState<any[]>([]);

  interface DataFile {
    fileId: String;
    filename: String;
  }
  var filesBox: DataFile[] = [];

  async function getExpedients(boxId: string) {
    try {
      const expedientsOfBox: any[] = await ShelvesMapController.getAllExpedientsFromBox(String(boxId));
      console.log(expedientsOfBox);
      setExpedientsOfBox(expedientsOfBox);
    } catch (error) {
      console.error("Error al obtener los expedientes", error);
    }
  }

  useEffect(() => {
    console.log("MODAL---")
    console.log(data);
    getExpedients(data.boxId);
  }, []);

  // pdf


  async function getBlobFromLocalPath(filePath: string): Promise<Blob> {
    try {
      const response = await fetch(filePath);
  
      if (!response.ok) {
        throw new Error(`Error al cargar el archivo: ${response.statusText}`);
      }
  
      return await response.blob();
    } catch (error) {
      console.error("Error al recuperar el blob:", error);
      throw error;
    }
  }

  async function openPDFFromLocalPath() {
    const filePath = "/sample-pdf.pdf"; // Cambia esta ruta según tu entorno
    try {
      const pdfBlob = await getBlobFromLocalPath(filePath);
      const pdfURL = URL.createObjectURL(pdfBlob);
      window.open(pdfURL, "_blank");
    } catch (error) {
      console.error("No se pudo abrir el archivo:", error);
    }
  }
  
  

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden  bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Exedientes de {data.shelveName} - {data.boxName}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Expedientes disponibles:
                    </p>
                  </div>

                  <div className="h-96 overflow-y-auto pt-3">
                    <div className="div-centrado flex">
                      <div className="flex flex-col space-y-1 w-full pr-2">
                        {expedientsOfBox.map((file: any, index: number) => (
                          <GeneralButton
                            key={String(data.shelveId) + index}
                            variant="primaryExpedients"
                            onClick={openPDFFromLocalPath}
                          >
                            <div className="box-estante-hor div-centrado">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 mr-2"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                                />
                              </svg>

                              {file.numero + " - " + file.anio}
                            </div>
                          </GeneralButton>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 div-centrado">
                    <GeneralButton variant="primary" onClick={onClose}>
                      Cerrar
                    </GeneralButton>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalDialog;
