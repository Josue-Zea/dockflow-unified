CREATE KEYSPACE IF NOT EXISTS evisor
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

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
    Expedientes LIST<UUID>
);

CREATE TABLE IF NOT EXISTS evisor.LogsDockflow (
    Id UUID PRIMARY KEY,
    Fecha TIMESTAMP,
    IDUsuario UUID,
    Operacion TEXT,
    Descripcion TEXT
);

ALTER TABLE evisor.Caja ADD Lleno int;

UPDATE evisor.Caja SET Lleno = 0;

ALTER TABLE evisor.TipoExpediente ADD ManejaTramites BOOLEAN;
UPDATE evisor.TipoExpediente SET ManejaTramites = True;

CREATE TABLE IF NOT EXISTS evisor.Tramite (
    Id UUID PRIMARY KEY,
    IDDocumento UUID
);

ALTER TABLE evisor.Tramite ADD Nombre TEXT;
ALTER TABLE evisor.Tramite ADD FechaRegistro TIMESTAMP;
ALTER TABLE evisor.Tramite ADD TipoTramite UUID;

CREATE TABLE IF NOT EXISTS evisor.TipoTramite (
    Id UUID PRIMARY KEY,
    Nombre TEXT
);