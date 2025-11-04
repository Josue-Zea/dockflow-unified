const { userAuthResponse } = require('../helpers/objectResponses');
const { client } = require("../database/conection");
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

const loginUsernamePasswordApi = async (user, psw) => {
    const query = "SELECT * FROM Usuario WHERE usuario = ? ALLOW FILTERING";
    const result = await client.execute(query, [user]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    if (result.rowLength === 0) return { correct: false, data: {} };

    const foundUser = result.rows[0];
    const storedPassword = foundUser.contrasenia;
    if (!storedPassword) return { correct: false, data: {} };

    const uuidUsuario = uuid.stringify(foundUser.id.buffer);
    const isHash = typeof storedPassword === "string" && storedPassword.startsWith("$2");

    let passwordMatches = false;
    if (isHash) {
        passwordMatches = await bcrypt.compare(psw, storedPassword);
    } else {
        passwordMatches = storedPassword === psw;

        if (passwordMatches) {
            // Promote legacy plaintext credentials to bcrypt on first successful login
            const hashedPassword = await bcrypt.hash(psw, SALT_ROUNDS);
            await persistPasswordHash(uuidUsuario, hashedPassword);
            foundUser.contrasenia = hashedPassword;
        }
    }

    if (!passwordMatches) return { correct: false, data: {} };

    return await getFoundedUser(foundUser);
}

const getFoundedUser = async (user) => {
    const uuidTipoUsuario = uuid.stringify(user.idtipousuario.buffer);
    const uuidUsuario = uuid.stringify(user.id.buffer);
    const tipoUsuario = await foundUnity("", uuidTipoUsuario);
    const permissions = await getPermissionsUser(uuidTipoUsuario);
    data = userAuthResponse(
        uuidUsuario,
        user.nombre,
        tipoUsuario.id,
        tipoUsuario.abreviatura,
        permissions.permisoexpedientes,
        permissions.permisolibros,
        permissions.verexpedientesproceso,
        permissions.verlibrosproceso
    );
    return { correct: true, data };
}

const foundUnity = async (abreviatura, uuid) => {
    const query = abreviatura !== "" ?
        "SELECT ID, Abreviatura FROM TipoUsuario WHERE Abreviatura = ? ALLOW FILTERING" :
        "SELECT ID, Abreviatura FROM TipoUsuario WHERE id = ?";
    const result = await client.execute(query, [abreviatura !== "" ? abreviatura : uuid]);

    if (result.hasError) {
        throw new Error(result.error);
    }

    return result.first();
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

const persistPasswordHash = async (uuidUsuario, hashedPassword) => {
    const query = "UPDATE Usuario SET contrasenia = ? WHERE id = ?";
    const result = await client.execute(query, [hashedPassword, uuidUsuario]);

    if (result.hasError) {
        throw new Error(result.error);
    }
}

module.exports = {
    loginUsernamePasswordApi,
};