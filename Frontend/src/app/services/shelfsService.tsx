import { variables } from "../configs/variables";

const API_BASE_URL = variables.host

export const shelfsService = {
    getAllShelfs: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            console.log(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
            throw new Error(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    createNewShelf: async (
        endpoint: string,
        headers: Record<string, string> = {},
        shelf: { nombre: string, ejex: number, ejey: number, ejez: number, alto: number, ancho: number }
    ) => {
        console.log(shelf)
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(shelf),
        });

        if (!response.ok) {
            console.log(`Error en la petición POST a ${endpoint}: ${response.statusText}`);
            throw new Error(`Error en la petición POST a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    addBoxToShelf: async (
        endpoint: string,
        headers: Record<string, string> = {},
        box: { idEstante: string }
    ) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: JSON.stringify(box)
        });

        if (!response.ok) {
            console.log(`Error en la petición PUT a ${endpoint}: ${response.statusText}`);
            throw new Error(`Error en la petición PUT a ${endpoint}: ${response.statusText}`);
        }

        return response; 
    },

    getBoxFromShelf: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            console.log(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
            throw new Error(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
        }

        return response; 
    },
    
    deleteShelf: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            console.log(`Error en la petición DELETE a ${endpoint}: ${response.statusText}`);
            throw new Error(`Error en la petición DELETE a ${endpoint}: ${response.statusText}`);
        }

        return response; 
    }
};