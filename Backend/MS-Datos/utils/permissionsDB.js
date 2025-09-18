const { client } = require("../database/conection");
const uuid = require('uuid');
const { permisoObject, kindUserObject, permissionsResponse } = require("../helpers/objectResponses");

const getPermissionsDB = async () => {
    const permissions = await findPermissions();
    const permissionsParsed = parsePermissions(permissions);
    const kindUsers = await findKindUsers();
    const kindUsersParsed = parseKindUsers(kindUsers);
    const result = joinPermissionsWithKindUser(permissionsParsed, kindUsersParsed);
    return {
        correct: true,
        data: result
    };
};

const findPermissions = async () => {
    const query = "SELECT * FROM PermisosTipoUsuario";
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const parsePermissions = (permissions) => {
    let newPermissions = [];
    for (let i = 0; i < permissions.length; i++) {
        const element = permissions[i];
        const newPermission = permisoObject(
            uuid.stringify(element.id.buffer),
            uuid.stringify(element.idtipousuario.buffer),
            element.permisoexpedientes,
            element.permisolibros,
            element.verexpedientesproceso,
            element.verlibrosproceso
        );
        newPermissions.push(newPermission);
    }
    return [...newPermissions];
}

const findKindUsers = async () => {
    const query = "SELECT * FROM TipoUsuario";
    const result = await client.execute(query, []);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.rows;
}

const parseKindUsers = (kindUsers) => {
    let newKindUsers = [];
    for (let i = 0; i < kindUsers.length; i++) {
        const element = kindUsers[i];
        const newKindOfUser = kindUserObject(
            uuid.stringify(element.id.buffer),
            element.abreviatura,
            element.nombre,
        );
        newKindUsers.push(newKindOfUser);
    }
    return [...newKindUsers];
}

const getPermissionsUser = async (uuidTipoUsuario) => {
    const query =
        "SELECT * FROM PermisosTipoUsuario WHERE idtipousuario = ? ALLOW FILTERING";
    const result = await client.execute(query, [uuidTipoUsuario]);

    if (result.hasError) {
        throw new Error(result.error);
    }
    return result.first();
}

const joinPermissionsWithKindUser = (permissions, kikndUser) => {
    const resultadoUnion = permissions.map(permiso => {
        const tipoUsuarioEncontrado = kikndUser.find(tipo => tipo.id === permiso.idTipoUsuario);

        // Retornar un objeto que combina propiedades de ambos arreglos
        return permissionsResponse(
            permiso.id,
            permiso.idTipoUsuario,
            permiso.permisoExpedientes || 0,
            permiso.permisoLibros || 0,
            permiso.verExpedientesProceso,
            permiso.verLibrosProceso,
            tipoUsuarioEncontrado ? tipoUsuarioEncontrado.abreviatura : '',
            tipoUsuarioEncontrado ? tipoUsuarioEncontrado.nombre : ''
        );
    });

    return resultadoUnion;
}

const updatePermissionDB = async (id, permisoExpedientes, permisoLibros, verExpedientesProceso, verLibrosProceso) => {
    const query =
    `UPDATE PermisosTipoUsuario SET
    permisoExpedientes = ?,
    permisoLibros = ?,
    verExpedientesProceso = ?,
    verLibrosProceso = ?
    WHERE id = ?`;
    const result = await client.execute(query,
        [permisoExpedientes, permisoLibros, verExpedientesProceso, verLibrosProceso, id],
        { prepare: true }
    );

    if (result.hasError) {
        return false;
    }
    return true;
}

module.exports = {
    getPermissionsDB,
    getPermissionsUser,
    updatePermissionDB
};