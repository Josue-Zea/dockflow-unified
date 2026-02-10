const { verifyToken } = require("../helpers/JWT");

// Middleware de autenticación seguro
const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Validar existencia del header
        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing"
            });
        }

        // 2. Validar formato Bearer
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid authorization format. Expected: Bearer <token>"
            });
        }

        // 3. Extraer token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                error: "Token not provided"
            });
        }

        // 4. Verificar token
        const tokenData = await verifyToken(token);

        if (!tokenData) {
            return res.status(401).json({
                error: "Invalid token"
            });
        }

        // 5. Inyectar user en request (opcional pero recomendado)
        req.user = tokenData;

        next();

    } catch (err) {
        return res.status(401).json({
            error: "Invalid token"
        });
    }
};

module.exports = {
    checkAuth
};
