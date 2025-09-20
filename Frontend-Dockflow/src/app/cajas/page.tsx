"use client";
import { useEffect, useState } from "react";
import { MainLayout } from "../Layouts/MainLayout";
import { Box } from '../interfaces/Box';
import { SelectedBox } from "./SelectedBox";
import { BoxList } from "./BoxList";
import { boxService } from "../services/boxService";
import { useRouter } from "next/navigation";

export default function Cajas() {
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);
  const [box, setBox] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    if (localStorage.getItem("selectedBox")) {
      setSelectedBox(JSON.parse(localStorage.getItem("selectedBox") || ""));
      setLoading(false);
    } else {
      getAllBox();
    }
  }, []);

  const getAllBox = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await boxService.getAllBox("/dockflow/getCajas", {
        Authorization: `Bearer ${token}`,
      });
      if (response.status === 200) {
        const data = await response.json();
        setBox(data);
      } else {
        alert("Error al obtener las cajas");
      }
    } catch (error) {
      alert("Error en la petición");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            </div>
          ) : selectedBox !== null ? (
            <SelectedBox box={selectedBox} setSelectedBox={setSelectedBox} />
          ) : (
            <BoxList
              boxs={box}
              selectBox={setSelectedBox}
              handleRemoveDocumentFromBox={getAllBox}
              reloadBoxes={getAllBox}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
