ALTER TABLE evisor.Expediente ADD IDCaja UUID;

CREATE INDEX IF NOT EXISTS caja_idestante_idx ON caja (idestante);
CREATE INDEX IF NOT EXISTS expediente_idcaja_idx ON expediente (idcaja);