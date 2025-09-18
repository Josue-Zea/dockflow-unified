export interface Permission {
    id: string;
    idTipoUsuario: string;
    permisoExpedientes: number;
    permisoLibros: number;
    verExpedientesProceso: boolean;
    verLibrosProceso: boolean;
    abreviatura: string;
    nombre: string;
}