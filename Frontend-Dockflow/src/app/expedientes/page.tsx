"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "../Layouts/MainLayout";
import { Document } from "../interfaces/Document";
import { DocumentList } from "./DocumentList";
import { documentsService } from "../services/documentsService";
import { SmallIconAllert } from "../alerts/alerts.functions";

export default function Expedientes() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return;
        }
        getAllDocuments();
    }, []);

    const getAllDocuments = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem("token");
            const response = await documentsService.getAllExpedientes(
                "/dockflow/getAllExpedientes",
                { Authorization: `Bearer ${token}` }
            );

            if (response.status === 200) {
                const data = await response.json();
                setDocuments(data);
            } else {
                SmallIconAllert("error", "Error al obtener los expedientes");
            }
        } catch (error) {
            SmallIconAllert("error", "Ocurrió un error al cargar los expedientes");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <div className="bg-white p-8 rounded-lg shadow-md mt-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-10">
                            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <DocumentList
                            documents={documents}
                            reloadDocuments={getAllDocuments}
                        />
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
