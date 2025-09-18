const { signToken } = require('../helpers/JWT');
const { loginUsernamePasswordApi } = require('../utils/loginUsernamePasswordApi');
const { saveLog } = require('../utils/saveLog');

const loginUsernamePassword = async (req, res) => {
    const { username, password } = req.body;

    let code = 0, data = { message: "" };
    try {
        const result = await loginUsernamePasswordApi(username, password);
        if (result.correct) {
            const response = {
                mensaje: "Correcto",
                token: signToken(result.data)
            }
            code = 200; data = response;
        } else {
            code = 401; data = { message: "Usuario o contraseña incorrectos" };
        }
    } catch (err) {
        console.log(err);
        code = 500; data = { message: "Ocurrió algún error" };
    }
    res.status(code).send(data);
    saveLog(true, "LOGIN", req.body, null);
};

module.exports = {
    loginUsernamePassword
};