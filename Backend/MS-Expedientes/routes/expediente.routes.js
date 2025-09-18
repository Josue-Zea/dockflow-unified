const express = require('express')
// Si fuera necesario realizar autenticación por jsonwebtoken descomentar estas lineas
// Esta para verificar que el token es valido
// const { checkAuth } = require('../middleware/auth.js');
// Esta para verificar que el usuario tenga acceso a la ruta
// const { checkRoleAuth } = require('../middleware/roleAuth.js');
const api = express.Router();
const controller = require('../controllers/expediente.controller.js');
// Si es necesario validar los objetos enviados por parámetros usar estos middlewares
// const { validateIdStadium, validateStadium } = require('../validators/estadio.js');

/**
* @swagger
* /admin/estadio:
*    get:
*       summary: Obtener listado de estadios
*       tags: [Estadios]
*       requestBody:
*           required: false
*       responses:
*           200:
*               description: Petición exitosa
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               data:
*                                   type: array
*                                   items:
*                                       $ref: '#/components/schemas/Estadio'
*                                   description: Arreglo de los estadios en el sistema
*                               message:
*                                   type: string
*                                   description: Mensaje para mayor información de la petición
*                           example:
*                               data: [ { "nombre": "Estadio Olímpico", "pais": "Kenya", "id_pais": 108, "id_estadio": 7, "capacidad": 72804 }  ]
*                               message: Petición exitosa
*           400:
*               description: Ha habido algún error en la petición
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               data:
*                                   type: array
*                                   description: Arreglo de los estadios
*                               message:
*                                   type: string
*                                   description: Mensaje para mayor información de la petición
*                           example:
*                               data: []
*                               message: Ha ocurrido algún error
*/
//Aquí definimos la ruta a utilizar, pueden agregarse los middlewares
api.post('/getExpediente', controller.getExpediente);
api.get('/getTipoExpediente', controller.getTipoExpediente);
api.get('/getSubtipoExpediente', controller.getSubTipoExpediente);
api.post('/createExpediente', controller.createExpediente);
api.delete('/deleteExpediente', controller.deleteExpediente);

// api.get('/getExpedientePadre', controller.getExpedienteByUser);

module.exports = api;