export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0; // Genera un número aleatorio de 0 a 15
        const value = char === 'x' ? random : (random & 0x3 | 0x8); // Asegura bits para 'y' en la posición 4
        return value.toString(16); // Convierte a hexadecimal
    });
}