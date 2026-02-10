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

module.exports = {
    userAuthResponse
};
