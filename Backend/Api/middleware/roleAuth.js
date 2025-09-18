const { verifyToken } = require("../helpers/JWT");

// Se valida que el usuario que quiera acceder a la ruta tenga acceso a la misma
const checkRoleAuth = ( roles ) => async (req, res, next) => {
    const token = req.headers.authorization.split(" ").pop();
    const tokenData = await verifyToken( token );
    // Se busca que el tipo de rol exista en los que son autorizados, estos se envían en el router
    if([].concat(roles).includes(tokenData.tipoUsuario)){
        next();
    }else{
        res.status(401).send(
            "No dispone de permisos para utilizar este endpoint"
        );
    }
};

module.exports = {
    checkRoleAuth
}