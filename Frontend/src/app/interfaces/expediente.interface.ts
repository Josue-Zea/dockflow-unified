export interface Expediente {
    numero: number;
    anio: number;
    numeroTramite: number;
    fecha: string;
    usuario: string;
    tipo: string;
    subtipo: string;
    estado: string;
};

export interface ExpedienteApi {
    esolicitud : number;
    numero_tramite : number;
    numero_expediente : number;
    anio_expediente : number;
}