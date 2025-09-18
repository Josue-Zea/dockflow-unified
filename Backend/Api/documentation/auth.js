

// POST - LOGIN
/**
* @swagger
* /auth/login:
*     post:
*         summary: Autenticarse en el sistema
*         tags: [Autenticación]
*         requestBody:
*             required: true
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             username:
*                                 type: string
*                                 description: Username del usuario a ingresar
*                             password:
*                                 type: string
*                                 description: Contraseña del usuario a ingresar
*                         example:
*                             username: Usuario145
*                             password: 123456
*         responses:
*             200:
*                 description: Petición exitosa
*                 content:
*                     application/json:
*                         schema:
*                             type: object
*                             properties:
*                                message:
*                                    type: string
*                                    description: Mensaje para mayor información de la petición
*                                token:
*                                    type: string
*                                    description: Token de acceso
*                             example:
*                                message: Correcto
*                                token: 1a4ds5s54a54ds21asd...
*             400:
*                 description: Ha ocurrido algún error en la petición
*         security: []
*/