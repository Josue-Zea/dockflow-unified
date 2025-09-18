import React, { memo } from "react";
import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import "../../styles/styleMap.css";
import "../../globals.css";
import GeneralButton from "./GeneralButton";

// Importacion de componentes
import ShelveTabs from "../Map/ShelveTabs";
import ModalDialog from "../Map/ModalDialog";

export default memo(({ data }: any) => {
  
  interface DataModal {
    shelveId: String;
    boxId: String;
    shelveName: String;
    boxName: String;
    expedienteBuscado: String;
  }

  

  // Estado para controlar qué modal está abierto (almacena el índice o null)
  const [activeModalIndex, setActiveModalIndex] = useState<String | null>(null);
  const [boxIdIndex, setBoxIdIndex] = useState<String | null>();
  const [dataModal, setDataModal] = useState<DataModal | null>(null)

  // Función para abrir el modal de una caja específica
  const openModal = (index: String, shelveId: String, boxId: String, shelveName: String, boxName: String, expedienteBuscado: String) => {
    setBoxIdIndex(boxId);
    setDataModal({
      shelveId: String(shelveId),
      boxId: String(boxId),
      shelveName: shelveName,
      boxName: boxName,
      expedienteBuscado: expedienteBuscado
    });
    setActiveModalIndex(index);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setBoxIdIndex(null);
    setActiveModalIndex(null);
  };

  return (
    <>
      <div className="div-centrado encabezado-nodo box-estante-ver w-full pr-2 pl-2 pt-4 ">
        <div className="box-estante-hor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7.875 14.25 1.214 1.942a2.25 2.25 0 0 0 1.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 0 1 1.872 1.002l.164.246a2.25 2.25 0 0 0 1.872 1.002h2.092a2.25 2.25 0 0 0 1.872-1.002l.164-.246A2.25 2.25 0 0 1 16.954 9h4.636M2.41 9a2.25 2.25 0 0 0-.16.832V12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 0 1 .382-.632l3.285-3.832a2.25 2.25 0 0 1 1.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0 0 21.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          <label style={{ fontSize: "20px" }}>
            {data.shelveName}
          </label>
        </div>

        
        <div style={{height: String(data.shelveHeight-50) + 'px'}} className="w-full overflow-y-auto mb-5">
          <div className="div-centrado flex">
            <div className="flex flex-col space-y-1 w-full pr-2">
              {data.boxes.map((tab : any, index : number) => (
                
                <GeneralButton key={String(data.shelveId) + index} 
                variant={tab.variantButton}
                onClick={() => openModal(String(data.shelveId), String(data.shelveId), String(tab.id), data.shelveName, String(tab.nombre), String(data.expedienteBuscado))} >
                  <div className="box-estante-hor div-centrado text-lg">
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
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                    Ver Caja No. {tab.nombre}
                  </div>
                </GeneralButton>
              ))}

              {/* Renderiza el modal si el índice está activo */}
              {activeModalIndex !== null && (
                <ModalDialog
                  isOpen={activeModalIndex !== null}
                  onClose={closeModal}
                  data={dataModal}
                >
                </ModalDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
