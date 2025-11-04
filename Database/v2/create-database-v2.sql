CREATE KEYSPACE IF NOT EXISTS evisor
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE IF NOT EXISTS evisor.Expediente (
    Numero INT,
    Anio INT,
    NumeroTramite INT,
    IDDocumento UUID,
    FechaRegistro TIMESTAMP,
    IDUsuario UUID,
    IDTipoDocumento UUID,
    FechaInserto TIMESTAMP,
    HojasDocumento INT,
    PesoDocumento DOUBLE,
    IDTipo UUID,
    IDSubtipo UUID,
    IDEstado UUID,
    IDCaja UUID,
    PRIMARY KEY (Numero, Anio, NumeroTramite)
);

CREATE TABLE IF NOT EXISTS evisor.Libro (
    Libro INT,
    Folio INT,
    IDDocumento UUID,
    FechaRegistro TIMESTAMP,
    IDUsuario UUID,
    FechaInserto TIMESTAMP,
    IDTipoDocumento UUID,
    HojasDocumento INT,
    PesoDocumento DOUBLE,
    IDTipo UUID,
    IDEstado UUID,
    PRIMARY KEY (Libro, Folio)
);

CREATE TABLE IF NOT EXISTS evisor.TipoDocumento (
    id UUID PRIMARY KEY,
    TipoDocumento TEXT
);

CREATE TABLE IF NOT EXISTS evisor.Documento (
    IDDocumento UUID,
    NumeroParte INT,
    Data BLOB,
    PRIMARY KEY (IDDocumento, NumeroParte)
);

CREATE TABLE IF NOT EXISTS evisor.TipoUsuario (
    Id UUID PRIMARY KEY,
    Abreviatura TEXT,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.PermisosTipoUsuario (
    Id UUID PRIMARY KEY,
    IDTipoUsuario UUID,
    PermisoExpedientes INT,
    PermisoLibros INT,
    VerExpedientesProceso BOOLEAN,
    VerLibrosProceso BOOLEAN
);

CREATE TABLE IF NOT EXISTS evisor.Usuario (
    Id UUID PRIMARY KEY,
    IDTipoUsuario UUID,
    Nombre TEXT,
    Usuario TEXT,
    Contrasenia TEXT
);

CREATE TABLE IF NOT EXISTS evisor.TipoLibro (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.TipoExpediente (
    Id UUID PRIMARY KEY,
    Nombre TEXT,
    ManejaTramites BOOLEAN
);

CREATE TABLE IF NOT EXISTS evisor.SubtipoExpediente (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.Bitacora (
    Id UUID PRIMARY KEY,
    Fecha TIMESTAMP,
    IDUsuario UUID,
    Operacion TEXT,
    Descripcion TEXT
);

CREATE TABLE IF NOT EXISTS evisor.Estado (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.TipoTramite (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.Tramite (
    Id UUID PRIMARY KEY,
    IDDocumento UUID,
    IDDocumentoPadre UUID,
    Nombre TEXT,
    FechaRegistro TIMESTAMP,
    TipoTramite UUID
);

CREATE TABLE IF NOT EXISTS evisor.SubDocumento (
    Id UUID PRIMARY KEY,
    IDDocumento UUID,
    Nombre TEXT,
    FechaRegistro TIMESTAMP,
    TipoSubdocumento UUID,
    idtramitepadre UUID,
    filepath TEXT
);

CREATE TABLE IF NOT EXISTS evisor.TipoSubdocumento (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);

CREATE TABLE IF NOT EXISTS evisor.Estante (
    Id UUID PRIMARY KEY,
    Nombre TEXT,
    EjeX INT,
    EjeY INT,
    EjeZ INT,
    Alto INT,
    Ancho INT,
);

CREATE TABLE IF NOT EXISTS evisor.Caja (
    Id UUID PRIMARY KEY,
    IDEstante UUID,
    Nombre TEXT,
    Expedientes LIST<UUID>,
    Lleno INT
);

CREATE TABLE IF NOT EXISTS evisor.Archivo (
    iddocumento UUID PRIMARY KEY,
    nombre TEXT,
    filepath TEXT,
    tipotramite TEXT
);