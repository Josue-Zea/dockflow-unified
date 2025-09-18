
// GET - GETESTANTES
/**
* @swagger
* /dockflow/getEstantes:
*    get:
*       summary: Obtrener todos los estantes en el sistema
*       tags: [Estantes]
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
*                           description: Arreglo de los estantes en el sistema
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// GET - GETESTANTESNIVEL
/**
* @swagger
* /dockflow/getEstantesNivel/{idNivel}:
*    get:
*       summary: Obtrener todos los estantes de un nivel en el sistema
*       tags: [Estantes]
*       parameters:
*           - in: path
*             name: idNivel
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
*                           description: Arreglo de los estantes del nivel solicitado en el sistema
*           400:
*               description: Ha ocurrido algún error en la petición
*           401:
*               description: No autorizado
*/

// POST - CREATEESTANTE
/**
* @swagger
* /dockflow/estante:
*    post:
*       summary: Crear un nuevo estante en el sistema
*       tags: [Estantes]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Estante'
*                   example:
*                       nombre: "Estante 1"
*                       ejex: 10
*                       ejey: 20
*                       ejez: 5
*                       alto: 1
*                       ancho: 2
*                   description: Datos del nuevo estante a crear
*       responses:
*           201:
*               description: Estante creado exitosamente
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Estante'
*           400:
*               description: Error en la creación del estante
*           401:
*               description: No autorizado
*/

// PUT - UPDATEESTANTE
/**
* @swagger
* /dockflow/estante/{idEstante}:
*    put:
*       summary: Actualizar un estante existente en el sistema
*       tags: [Estantes]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: string
*           required: true
*           description: UUID del estante a actualizar
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Estante'
*                   example:
*                       nombre: "Estante actualizado"
*                       ejex: 15
*                       ejey: 25
*                       ejez: 8
*                       ancho: 1
*                       alto: 2
*                   description: Nuevos datos del estante
*       responses:
*           200:
*               description: Estante actualizado exitosamente
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Estante'
*           400:
*               description: Error en la actualización del estante
*           401:
*               description: No autorizado
*/

// DELETE - DELETEESTANTE
/**
* @swagger
* /dockflow/estante/{idEstante}:
*    delete:
*       summary: Eliminar un estante del sistema
*       tags: [Estantes]
*       parameters:
*         - in: path
*           name: id
*           schema:
*             type: string
*           required: true
*           description: UUID del estante a eliminar
*       responses:
*           200:
*               description: Estante eliminado exitosamente
*           400:
*               description: Error en la eliminación del estante
*           401:
*               description: No autorizado
*/
