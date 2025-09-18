export interface User {
    id: string,
    nombre: string,
    idTipoUsuario: string,
    tipoUsuario: string,
    permisoExpedientes: number,
    permisoLibros: number,
    verExpedientesProceso: boolean,
    verLibrosProceso: boolean,
}