const { createUUID, client } = require("../database/conection");
const logger = require('../helpers/logger');

const QUERY = "INSERT INTO Bitacora (Id, Fecha, IDUsuario, Operacion, Descripcion) VALUES (?, ?, ?, ?, ?)";
const QUERY_NO_USER = "INSERT INTO Bitacora (Id, Fecha, Operacion, Descripcion) VALUES (?, ?, ?, ?)";

/**
 * Inserta un registro en la tabla Bitacora de forma fire-and-forget.
 * No lanza errores — los captura internamente y los loguea con winston.
 */
const saveAuditLog = (userId, operacion, descripcion) => {
    createUUID()
        .then((id) => {
            const hasUser = userId != null;
            const query = hasUser ? QUERY : QUERY_NO_USER;
            const values = hasUser
                ? [id, new Date(), userId, operacion, descripcion]
                : [id, new Date(), operacion, descripcion];
            return client.execute(query, values, { prepare: true });
        })
        .catch((err) => {
            logger.logError(err, { context: 'saveAuditLog', table: 'Bitacora' });
        });
};

/**
 * Compatibilidad con la interfaz anterior: saveLog(login, operacion, descripcion, request)
 */
const saveLog = (login, operacion, descripcion, request) => {
    let userId = null;
    if (!login && request && request.user) {
        userId = request.user.id;
    }
    saveAuditLog(userId, JSON.stringify(operacion), JSON.stringify(descripcion));
};

module.exports = {
    saveLog,
    saveAuditLog,
};
