const userAuthResponse = (
    id,
    nombre,
    idTipoUsuario,
    tipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso
) => ({
    id,
    nombre,
    idTipoUsuario,
    tipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso
});

const permisoObject = (
    id,
    idTipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso
) => ({
    id,
    idTipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso
}
);

const kindUserObject = (
    id,
    abreviatura,
    nombre
) => ({
    id,
    abreviatura,
    nombre
});

const permissionsResponse = (
    id,
    idTipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso,
    abreviatura,
    nombre
) => ({
    id,
    idTipoUsuario,
    permisoExpedientes,
    permisoLibros,
    verExpedientesProceso,
    verLibrosProceso,
    abreviatura,
    nombre
});

const userResponse = (
    id,
    nombre
) => ({
    id,
    nombre
});

const logResponse = (
    id,
    descripcion,
    fecha,
    idUsuario,
    operacion
) => ({
    id,
    descripcion,
    fecha,
    idUsuario,
    operacion
});

module.exports = {
    userAuthResponse,
    permisoObject,
    kindUserObject,
    permissionsResponse,
    userResponse,
    logResponse
};