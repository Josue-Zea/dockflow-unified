import { variables } from "../configs/variables";

const API_BASE_URL = variables.host

export const authService = {

    /**
     * Realiza una petición POST con cuerpo
     * @param endpoint - El endpoint de la API, relativo a la base URL
     * @param body - El cuerpo de la petición en formato JSON
     * @param headers - Headers adicionales si son necesarios
     * @returns La respuesta en formato JSON
     */
    login: async (
        endpoint: string,
        expedienteData: { username: string, password: string }
    ) => {
        const completeEndpoint = `${API_BASE_URL}${endpoint}`
        console.log('completeEndpoint:', completeEndpoint)

        try {

            // Hacer la petición POST
            const response = await fetch(completeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expedienteData),
            });

            if (!response.ok) {
                console.log(`Error en la petición POST a ${endpoint}: ${response}`)
            }

            return response;
        } catch (error) {
            console.log(`Error al hacer la petición: ${error}`)
        }
    },
};