import { variables } from "../configs/variables";

const API_BASE_URL = variables.host

export const boxService = {
    getAllBox: async (endpoint: string, headers: Record<string, string> = {}) => {
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

    createBox: async (
        endpoint: string,
        headers: Record<string, string> = {},
        shelf: { nombre: string }
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

    removeBoxFromShelf: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la petición DELETE a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    deleteBox: async (endpoint: string, headers: Record<string, string> = {}) => {
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