// GET - GETCAJAS
/**
* @swagger
* /dockflow/getCajas/{idEstante}:
*    get:
*       summary: Obtrener todas las cajas de un estante
*       tags: [Cajas]
*       parameters:
*           - in: path
*             name: idEstante
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
*                               $ref: '#/components/schemas/Caja'
*                           description: Arreglo de las cajas del estante solicitado
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// GET - GETEXPEDIENTES
/**
* @swagger
* /dockflow/getExpedientes/{idEstante}/{idCaja}:
*    get:
*       summary: Obtrener todos los expedientes de una caja
*       tags: [Cajas]
*       parameters:
*           - in: path
*             name: idEstante
*           - in: path
*             name: idCaja
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
*                               $ref: '#/components/schemas/Estante'
*                           description: Arreglo de id´s de los expedientes de la caja solicitada
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// POST - CREATECAJA
/**
* @swagger
* /dockflow/caja:
*    post:
*       summary: Crear una nueva caja en el sistema
*       tags: [Cajas]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Caja'
*                   example:
*                       nombre: "Caja 1"
*                       estanteId: "uuid-estante"
*                   description: Datos de la nueva caja a crear
*       responses:
*           201:
*               description: Caja creada exitosamente
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Caja'
*           400:
*               description: Error en la creación de la caja
*           401:
*               description: No autorizado
*/

// PUT - UPDATECAJA
/**
* @swagger
* /dockflow/caja/{idCaja}:
*    put:
*       summary: Actualizar una caja existente en el sistema
*       tags: [Cajas]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: string
*           required: true
*           description: UUID de la caja a actualizar
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Caja'
*                   example:
*                       nombre: "Caja actualizada"
*                       idEstante: "uuid-estante"
*                   description: Nuevos datos de la caja
*       responses:
*           200:
*               description: Caja actualizada exitosamente
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Caja'
*           400:
*               description: Error en la actualización de la caja
*           401:
*               description: No autorizado
*/

// DELETE - DELETECAJA
/**
* @swagger
* /dockflow/caja/{idCaja}:
*    delete:
*       summary: Eliminar una caja del sistema
*       tags: [Cajas]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: string
*           required: true
*           description: UUID de la caja a eliminar
*       responses:
*           200:
*               description: Caja eliminada exitosamente
*           400:
*               description: Error en la eliminación de la caja
*           401:
*               description: No autorizado
*/

// PUT - ADDEXPEDIENTECAJA
/**
* @swagger
* /dockflow/caja/{idCaja}/{idExpediente}:
*    put:
*       summary: Agregar un expediente a una caja
*       tags: [Cajas]
*       parameters:
*         - in: path
*           name: idCaja
*           schema:
*             type: string
*           required: true
*           description: UUID de la caja en la que se agregará el expediente
*         - in: path
*           name: idExpediente
*           schema:
*             type: string
*           required: true
*           description: UUID del expediente que se agregará a la caja
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Caja'
*                   example:
*                       nombre: "Expediente agregado con exito"
*                       estanteId: "uuid-estante"
*                       posicion: 5
*                   description: Nuevos datos de la caja
*       responses:
*           200:
*               description: Caja actualizada exitosamente
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Caja'
*           400:
*               description: Error en la actualización de la caja
*           401:
*               description: No autorizado
*/

// DELETE - DELETEEXPEDIENTECAJA
/**
* @swagger
* /dockflow/caja/{idCaja}/{idExpediente}:
*    delete:
*       summary: Desvincular un expediente de una caja
*       tags: [Cajas]
*       parameters:
*         - in: path
*           name: idCaja
*           schema:
*             type: string
*           required: true
*           description: UUID de la caja en la que se agregará el expediente
*         - in: path
*           name: idExpediente
*           schema:
*             type: string
*           required: true
*           description: UUID del expediente que se agregará a la caja
*       responses:
*           200:
*               description: Expediente desvinculado exitosamente
*           400:
*               description: Error en la desvinculación del expediente
*           401:
*               description: No autorizado
*/
