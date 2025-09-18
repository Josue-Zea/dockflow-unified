import { variables } from "../configs/variables";

const API_BASE_URL = variables.host

export const documentsService = {
    /**
 * Convierte un archivo en Base64
 * @param file - El archivo a convertir
 * @returns Una promesa con el archivo en formato Base64
 */
    fileToBase64: (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1]; // Eliminamos el encabezado "data:application/pdf;base64,"
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    },

    /**
     * Realiza una petición GET sin cuerpo
     * @param endpoint - El endpoint de la API, relativo a la base URL
     * @param headers - Headers adicionales si son necesarios
     * @returns La respuesta en formato JSON
     */
    get: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
        }

        return response.json();
    },

    /**
     * Realiza una petición POST con cuerpo
     * @param endpoint - El endpoint de la API, relativo a la base URL
     * @param body - El cuerpo de la petición en formato JSON
     * @param headers - Headers adicionales si son necesarios
     * @returns La respuesta en formato JSON
     */
    createExpediente: async (
        endpoint: string,
        expedienteData: {
            numero_expediente: number;
            anio_expediente: number;
            file: File;
            fileBase64: string;
            idtipo: string;
            idsubtipo: string;
            numerotramite: number;
        },
        headers: Record<string, string> = {}
    ) => {
        const { numero_expediente, anio_expediente, file, fileBase64, idtipo, idsubtipo, numerotramite } = expedienteData;
        const completeEndpoint = `${API_BASE_URL}${endpoint}`

        try {
            // Crear el cuerpo de la petición con el archivo en base64
            const body = {
                numero_expediente,
                anio_expediente,
                idtipo,
                idsubtipo,
                numerotramite,
                document: fileBase64 !== "" ?
                    expedienteData.fileBase64 :
                    await documentsService.fileToBase64(file),
            };

            // Hacer la petición POST
            const response = await fetch(completeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                console.log(`Error en la petición POST a ${endpoint}: ${response}`)
                throw new Error(`Error en la petición POST a ${endpoint}: ${response}`);
            }

            return response.status;
        } catch (error) {
            console.log(`Error al convertir el archivo o hacer la petición: ${error}`)
            throw new Error(`Error al convertir el archivo o hacer la petición: ${error}`);
        }
    },

    getAllExpedientes: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    getExpedientesFromCaja: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la petición GET a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    getExpediente: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        return response;
    },

    scanDocument: async (dpi: number, type: number, duplex: number, name: string) => {
        const url = `http://localhost:8080/scan/?dpi=${dpi}&tipo=${type}&duplex=${duplex}&nombre=${name}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        return response;
    },

    addDocumentBox: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`Error en la petición PUT a ${endpoint}: ${response.statusText}`);
        }

        return response;
    },

    removeDocumentToBox: async (endpoint: string, headers: Record<string, string> = {}) => {
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

    getTypes: async (endpoint: string, headers: Record<string, string> = {}) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        });

        return response;
    }
};