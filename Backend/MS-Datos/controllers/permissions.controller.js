const { getPermissionsDB, updatePermissionDB } = require("../utils/permissionsDB");

const getPermissions = async (_, res) => {
    const result = await getPermissionsDB();
    let code = 0, data = { message: ""};
    if(result.correct){
        code = 200; data = result.data;
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

const updatePermission = async (req, res) => {
    const { id, permisoExpedientes, permisoLibros, verExpedientesProceso, verLibrosProceso } = req.body;
    const result = await updatePermissionDB(id, permisoExpedientes, permisoLibros, verExpedientesProceso, verLibrosProceso);
    let code = 0, data = { message: ""};
    if(result){
        code = 200; data = { message: "OK"}
    } else {
        code = 400; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
}

module.exports = {
    getPermissions,
    updatePermission
};