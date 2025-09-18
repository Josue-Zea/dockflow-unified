"use client";
import { useEffect, useState } from "react";
import { MainLayout } from "../Layouts/MainLayout";
import { Document } from "../interfaces/Document";
import { DocumentList } from "./DocumentList";
import { documentsService } from "../services/documentsService";
import { SmallIconAllert } from "../alerts/alerts.functions";
import { useRouter } from "next/navigation";

export default function Expedientes() {
    const [documents, setDocuments] = useState<Document[]>([])
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
            return
        }

        getAllDocuments()
    }, [])

    const getAllDocuments = async () => {
        const token = localStorage.getItem("token");
        const response = await documentsService.getAllExpedientes('/dockflow/getAllExpedientes', { 'Authorization': `Bearer ${token}` })
        console.log(response);
        if (response.status === 200) {
            const data = await response.json()
            setDocuments(data)
        } else {
            SmallIconAllert("error", "Error al obtener los expedientes")
        }
    }

    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <div className="bg-white p-8 rounded-lg shadow-md mt-6">
                    <DocumentList documents={documents} />
                </div>
            </div>
        </MainLayout>
    );
}
