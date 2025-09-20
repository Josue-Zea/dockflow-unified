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
  const [selectedShelf, setSelectedShelf] = useState<Shelf | null>(null);
  const [shelfs, setShelfs] = useState<Shelf[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const savedShelf = localStorage.getItem("selectedShelf");
    if (savedShelf) {
      setSelectedShelf(JSON.parse(savedShelf));
      setLoading(false);
    } else {
      getShelfs();
    }
  }, []);

  const getShelfs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const newShelfs = await shelfsService.getAllShelfs(
        "/dockflow/getEstantes",
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (newShelfs.status === 200) {
        const data = await newShelfs.json();
        setShelfs(data);
      } else {
        SmallIconAllert("error", "Error al obtener los estantes");
      }
    } catch (err: any) {
      SmallIconAllert("error", `Error inesperado: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShelf = (shelf: Shelf) => {
    localStorage.setItem("selectedShelf", JSON.stringify(shelf));
    setSelectedShelf(shelf);
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-gray-600">
              {/* Spinner con Tailwind */}
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium">Cargando estantes...</span>
            </div>
          ) : selectedShelf ? (
            <SelectedShelf
              shelf={selectedShelf}
              setSelectedShelf={setSelectedShelf}
              reloadShelfs={getShelfs}
            />
          ) : (
            <ShelfList
              shelfs={shelfs}
              selectShelf={handleClickShelf}
              reloadShelfs={getShelfs}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
