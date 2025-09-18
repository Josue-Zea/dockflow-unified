import React from 'react'
import { Document } from '../interfaces/Document';
import { DocumentsTable } from '../components/DocumentsTable';
import { useRouter } from 'next/navigation';

export const DocumentList = ({ documents }: DocumentListProps) => {
    const router = useRouter();
    const handleClickDocument = () => {
        console.log("")
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Expedientes</h1>

            <button
                type="submit"
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:opacity-80 transition mb-4`}
                onClick={() => router.push('/dashboard')}
            >
                Agregar expediente
            </button>

            <h2 className="text-xl font-bold mb-4">Listado de Expedientes</h2>
            {documents.length > 0 ? (
                <DocumentsTable documents={documents} handleClickDocument={handleClickDocument} />
            ) : (
                <p className="text-gray-500">No hay estantes registrados.</p>
            )}
        </>
    )
}

export interface DocumentListProps {
    documents: Document[]
}
