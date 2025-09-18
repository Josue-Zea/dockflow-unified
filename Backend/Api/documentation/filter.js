

// GET - USERS
/**
* @swagger
* /filter/getUsuarios:
*    get:
*       summary: Obtener a los usuarios en el sistema
*       tags: [Filtros]
*       requestBody:
*           required: false
*       responses:
*           200:
*               description: Petición exitosa
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Empleado'
*                           description: Arreglo de los empleados en el sistema
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// POST - FILTERLOGS
/**
* @swagger
* /filter/filterLogs:
*    post:
*       summary: Filtrar la bitácora en el sistema
*       tags: [Filtros]
*       requestBody:
*           required: false
*           content:
*               application/json:
*                   schema:
*                       type: object
*                       properties:
*                           $ref: '#/components/schemas/FiltroLogs'
*                       example:
*                           begin: '2023-12-01'
*                           end: '2023-12-31'
*                           user: 'd296551ca'
*                           limit: 1
*       responses:
*           200:
*               description: Petición exitosa
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                           items:
*                               $ref: '#/components/schemas/Log'
*                           description: Arreglo de los registros que pasaron los filtros
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/