const { updateToken } = require("../utils/updateToken");
const { loginUsernamePasswordApi } = require("../utils/loginUsernamePasswordApi");
const { verifyExistingUser } = require("../utils/verifyExistingUser");

const loginUsernamePassword = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (global.token === '') {
        const result = await updateToken();
        if (!result) {
            res.status(501).send("Error al actualizar el token desde apiRM");
            console.log("Error al actualizar el token"); return;
        }
    }

    let code = 0, data = { message: "" };
    try {
        const result = await loginUsernamePasswordApi(username, password);
        if (result.correct) {
            const resultFoundUser = await verifyExistingUser(result.data);
            if (!resultFoundUser.correct) {
                code = 401; data = { message: "Autenticación fallida" };
            } else {
                code = 200; data = resultFoundUser.data;
            }
        } else {
            code = 401; data = { message: "Autenticación fallida" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
};

module.exports = {
    loginUsernamePassword
};