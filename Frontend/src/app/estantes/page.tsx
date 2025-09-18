"use client";
import { useState, useEffect } from 'react';
import { MainLayout } from "../Layouts/MainLayout";
import { Shelf } from "../interfaces/Shelf";
import { ShelfList } from "./ShelfList";
import { SelectedShelf } from "./SelectedShelf";
import { shelfsService } from '../services/shelfsService';
import { SmallIconAllert } from '../alerts/alerts.functions';
import { useRouter } from 'next/navigation';

export default function Estantes() {
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null)
  const [shelfs, setShelfs] = useState<Shelf[]>([])
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return
    }

    if (localStorage.getItem('selectedShelf')) {
      setSelectedShelf(JSON.parse(localStorage.getItem('selectedShelf') || ''));
    } else {
      getShelfs();
    }
  }, [])

  const getShelfs = async () => {
    const token = localStorage.getItem("token");

    const newShelfs = await shelfsService.getAllShelfs("/dockflow/getEstantes", {
      'Authorization': `Bearer ${token}`,
    });

    if(newShelfs.status === 200){
      const data = await newShelfs.json();
      console.log(data)
      setShelfs(data)
    } else {
      SmallIconAllert("error", "Error al obtener los estantes");
    }
  }

  const handleClickShelf = (shelf: Shelf) => {
    localStorage.setItem('selectedShelf', JSON.stringify(shelf))
    setSelectedShelf(shelf)
  }

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          {
            selectedShelf !== null ? (
              <SelectedShelf shelf={selectedShelf} setSelectedShelf={setSelectedShelf} />
            ) : (
              <ShelfList shelfs={shelfs} selectShelf={handleClickShelf} />
            )
          }
        </div>
      </div>
    </MainLayout>
  );
}
