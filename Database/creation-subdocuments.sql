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