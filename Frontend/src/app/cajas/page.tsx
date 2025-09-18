"use client";
import { useEffect, useState } from "react";
import { MainLayout } from "../Layouts/MainLayout";
import { Box } from '../interfaces/Box';
import { SelectedBox } from "./SelectedBox";
import { BoxList } from "./BoxList";
import { boxService } from "../services/boxService";
import { useRouter } from "next/navigation";

export default function Cajas() {
  const [selectedBox, setSelectedBox] = useState<Box | null>(null)
  const [box, setBox] = useState<Box[]>([])
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return
    }

    if (localStorage.getItem('selectedBox')) {
      setSelectedBox(JSON.parse(localStorage.getItem('selectedBox') || ''));
    } else {
      getAllBox();
    }
  }, [])
  
  const getAllBox = async () => {
    const token = localStorage.getItem("token");
    const response = await boxService.getAllBox("/dockflow/getCajas", { 'Authorization': `Bearer ${token}` });
    if (response.status === 200) {
      const data = await response.json();
      setBox(data)
    } else {
      alert('Error al obtener las cajas');
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          {
            selectedBox !== null ? (
              <SelectedBox box={selectedBox} setSelectedBox={setSelectedBox} />
            ) : (
              <BoxList boxs={box} selectBox={setSelectedBox} handleRemoveDocumentFromBox={getAllBox}/>
            )
          }
        </div>
      </div>
    </MainLayout>
  );
}
