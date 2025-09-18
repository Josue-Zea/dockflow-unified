
// POST - GETEXPEDIENTE
/**
* @swagger
* /expedientes/getExpediente:
*     post:
*         summary: Obtener un expediente específico
*         tags: [Expedientes]
*         requestBody:
*             required: true
*             content:
*                 application/json:
*                     schema:
*                         type: object
*                         properties:
*                             numero_expediente:
*                                 type: number
*                                 description: Número del expediente a buscar
*                             anio_expediente:
*                                 type: number
*                                 description: Año del expediente a buscar
*                             watermark:
*                                 type: boolean
*                                 description: Si desea agregar la marca de agua "COPIA" al documento enviar true, si no puede omitir el valor o enviar false
*                         example:
*                             numero_expediente: 123456
*                             anio_expediente: 2024
*                             watermark: false
*         responses:
*             200:
*                 description: Petición exitosa
*                 content:
*                     application/pdf:
*                         schema:
*                             type: string
*                             format: binary
*             400:
*                 description: Ocurrió algún error
*/

// GET - GETEXPEDIENTE
/**
* @swagger
* /dockflow/getExpediente/{numero}/{anio}:
*    get:
*       summary: Obtrene los metadatos de un expediente
*       tags: [Expedientes]
*       parameters:
*           - in: path
*             name: numero
*           - in: path
*             name: anio
*       requestBody:
*           required: false
*       responses:
*           200:
*               description: Petición exitosa
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           items:
*                               $ref: '#/components/schemas/ExpedienteMetadata'
*                           description: Datos del expediente solicitado
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/
