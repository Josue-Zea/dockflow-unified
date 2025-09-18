export const validarTexto = (texto: string): boolean => {
    // Define la expresión regular para el formato numero-numero
    const patron = /^\d+-\d+$/;

    // Verifica si el texto coincide con la expresión regular
    return patron.test(texto);
}