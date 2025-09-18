

// GET - GETPERMISOS
/**
* @swagger
* /permisos/getPermisos:
*    get:
*       summary: Obtener los permisos actuales en el sistema
*       tags: [Permisos]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           $ref: '#/components/schemas/Permiso'
*                       example:
*                           id: 07bb30dd-6173-4b07-b1b7-9b0269d06c86
*                           idTipoUsuario: c61f2a7b-9b77-4d92-a2b5-45c20c7e0cf4
*                           permisoExpedientes: 3
*                           permisoLibros: 3
*                           verExpedientesProceso: true
*                           verLibrosProceso: true
*                           abreviatura: C
*                           nombre: Certificaciones
*       responses:
*           200:
*               description: Petición exitosa
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Permiso'
*                           description: Arreglo de los permisos actuales en el sistema
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// PUT - UPDATEPERMISO
/**
* @swagger
* /permisos/updatePermiso:
*    put:
*       summary: Actualizar un permiso en el sistema
*       tags: [Permisos]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           $ref: '#/components/schemas/PermisoUpdate'
*                       example:
*                           id: 07bb30dd-6173-4b07-b1b7-9b0269d06c86
*                           permisoExpedientes: 3
*                           permisoLibros: 3
*                           verExpedientesProceso: true
*                           verLibrosProceso: true
*       responses:
*           200:
*               description: Petición exitosa
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/