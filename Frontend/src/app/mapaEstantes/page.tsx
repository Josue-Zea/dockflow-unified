"use client";

// Componentes
import { Field, Label, Switch } from "@headlessui/react";
import ShelveNode from "../components/Map/ShelveNode";
import { useEffect, useState } from "react";

import React, { useCallback, MouseEvent } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  Node,
  Edge,
  useReactFlow,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import "../globals.css";
import "../styles/styleMap.css";

// Controlador API
import ShelvesMapController from "../controller/ShelvesMapController";
import { MainLayout } from "../Layouts/MainLayout";

const nodeTypes = {
  shelveNode: ShelveNode,
};

var initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const ShelvesMap = () => {


  // Metodos y Variables de Nodos
  var [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const { getIntersectingNodes } = useReactFlow();

  const onNodeDrag = useCallback((_: MouseEvent, node: Node) => {
    const intersections = getIntersectingNodes(node).map((n) => n.id);

    setNodes((ns) =>
      ns.map((n) => ({
        ...n,
        className: intersections.includes(n.id) ? "highlight" : "",
      }))
    );
  }, []);

  // Metodos y variables de servicios
  const [enabled, setEnabled] = useState(false);

  const [numeroExpediente, setNumeroExpediente] = useState<string>("");
  const [anioExpediente, setAnioExpediente] = useState<string>("");

  async function highlightNode(nodeId: string, boxId: string, expediId: string) {

    const updatedNodes = nodes.map((nodeItem) => {
      if (nodeItem.id === nodeId) {
        const updatedStyle = {
          ...nodeItem.style,
          background: "yellow",
        };

        const updatedBoxes = (nodeItem.data.boxes as any[]).map((boxItem) => {

          if (boxItem.id === boxId) {
            console.log(nodeItem.id + "--" + boxItem.id);
            return {
              ...boxItem,
              variantButton: "success2",
            };
          }
          return boxItem;
        });

        return {
          ...nodeItem,
          style: updatedStyle,
          data: {
            ...nodeItem.data,
            boxes: updatedBoxes,
            expedienteBuscado: expediId
          },
        };
      }
      // No hay cambios.
      return nodeItem;
    });

    // Actualizacion
    setNodes([...updatedNodes]);
  };

  async function resetNodeStyle() {
    console.log("Reset");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedNodes = nodes.map((nodeItem) => {
      console.log(nodeItem);
      return {
        ...nodeItem,
        style: {
          ...nodeItem.style,
          background: "white",
          border: "2px solid black",
        },
        data: {
          ...nodeItem.data,
          boxes: (nodeItem.data.boxes as any[]).map((boxItem) => ({
            ...boxItem,
            variantButton: "primary",
          })),
        },
      };
    });

    // Forzar ReactFlow a detectar los cambios con una referencia completamente nueva
    setNodes([...updatedNodes]);
  }


  async function loadShelves(mostrarSegundo: boolean) {
    try {
      const dataShelves = await ShelvesMapController.getAllShelves();

      var newNodes: any[] = [];

      for (const shelve of dataShelves) {
        // Obtener Caja del Estante con el IdEstante
        var boxsShelve: any[] = await ShelvesMapController.getAllBoxesShelve(String(shelve.id));
        console.log(boxsShelve);
        if (shelve.id === "617190f8-2a62-4e19-8caa-fb686d11a2f1") {
          continue;
        }

        if (mostrarSegundo === true && shelve.ejez === 1) {
          continue;
        } else if (mostrarSegundo === false && shelve.ejez === 2) {
          continue;
        }

        boxsShelve.forEach(boxItem => {
          boxItem.variantButton = "primary";
        });

        var nodeStructure = {
          id: String(shelve.id),
          type: "shelveNode",
          data: { shelveId: String(shelve.id), shelveName: String(shelve.nombre), shelveHeight: shelve.alto, boxes: boxsShelve, expedienteBuscado: "" },
          style: { width: shelve.ancho, height: shelve.alto, border: "2px solid black", background: 'white' },
          position: { x: shelve.ejex, y: shelve.ejey },
          draggable: false,
        };

        newNodes.push(nodeStructure);

      }

      setNodes(newNodes);
    } catch (error) {
      console.error("Error al cargar los estantes", error);
    }
  }

  // Hook para cargar datos al cargar el componente
  useEffect(() => {
    loadShelves(false);
  }, []);

  async function searchFile() {
    try {

      var metadata: any = await ShelvesMapController.getMetadataExpediente(String(numeroExpediente), String(anioExpediente));
      if (metadata === null) { throw "No existe expediente"; };

      setNodes([]);
      await loadShelves(enabled);
      await highlightNode(String(metadata.idestante), String(metadata.idcaja), String(metadata.idocumento));
    } catch (error) {
      resetNodeStyle();
      alert("Error o no existe expediente");
    }
  }

  // onChange segundo nivel
  async function onChangeSwitch() {
    loadShelves(!enabled);
  }

  return (
    <MainLayout>
      <div className="div-centrado mx-10 mt-5 flex flex-col">
        <div className="w-full">
          <div className="div-centrado text-2xl font-bold p-2 flex flex-row">
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
                d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
              />
            </svg>
            Mapa Estantes
          </div>
        </div>

        <div className="w-full flex felx-row">
          <div className="w-1/5 p-2" style={{ width: "300px", height: "600px" }}>
            <label className="block mb-2 text-sm text-slate-600">
              Búsqueda de Expediente
            </label>
            <div className="relative">
              <input
                onChange={(e) => setNumeroExpediente(e.target.value)}
                type="number"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Numero Expediente"
              />

              <input
                onChange={(e) => setAnioExpediente(e.target.value)}
                type="number"
                className="mt-2 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Año Expediente"
              />
            </div>

            <div className="relative">
              <button

                className="mt-2 rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm
              hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={searchFile}
              >
                Buscar
              </button>
            </div>

            <div className="relative mt-4">
              <Field>
                <Label className="text-sm text-slate-600">Ver Segundo Nivel</Label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  onClick={onChangeSwitch}
                  className="ml-2 group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-blue-600"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
              </Field>
            </div>
          </div>


          <div
            className="w-4/5 border border-2 border-black shadow-2xl"
            style={{ width: "1100px", height: "600px" }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <ReactFlow
                nodes={nodes}
                edges={initialEdges}
                onNodesChange={onNodesChange}
                onNodeDrag={onNodeDrag}
                className="intersection-flow"
                minZoom={0.2}
                maxZoom={4}
                fitView
                selectNodesOnDrag={false}
                nodeTypes={nodeTypes}
              >
                <Controls />

                <Background />
              </ReactFlow>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <ShelvesMap></ShelvesMap>
    </ReactFlowProvider>
  );
}
