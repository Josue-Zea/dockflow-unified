/**
* @swagger
*   components:
*       schemas:
*           ExpedienteMetadata:
*               type: object
*               properties:
*                   numero:
*                       type: number
*                       description: Número del expediente
*                   anio:
*                       type: number
*                       description: Año del expediente
*                   numerotramite:
*                       type: number
*                       description: Número de trámite del expediente
*                   fechainserto:
*                       type: date
*                       description: Fecha en la que se insertó el expediente en base de datos
*                   fecharegistro:
*                       type: date
*                       description: Fecha en la que se escaneó el expediente
*                   hojasdocumento:
*                       type: number | null
*                       description: Número de hojas que contiene el expediente
*                   idcaja:
*                       type: string
*                       description: Id de la caja en la que se encuentra el expediente
*                   nombrecaja:
*                       type: string
*                       description: Nombre de la caja en la que se encuentra el expediente
*                   idestante:
*                       type: string
*                       description: Id del estante en el que se encuentra la caja
*                   nombreestante:
*                       type: string
*                       description: Nombre del estante en el que se encuentra la caja
*                   ejex:
*                       type: number
*                       description: Valor en el eje x que se encuentra el estante
*                   ejey:
*                       type: number
*                       description: Valor en el eje y que se encuentra el estante
*                   ejez:
*                       type: number
*                       description: Valor en el eje z que se encuentra el estante
*                   alto:
*                       type: number
*                       description: Valor del alto en el que se encuentra el estante
*                   ancho:
*                       type: number
*                       description: Valor del ancho en el que se encuentra el estante
*                   nombre:
*                       type: string
*                       description: Nombre asignado a la estantería
*           Caja:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del empleado
*                   idEstante:
*                       type: string
*                       description: Id del estante donde se ubica esta caja
*                   expedientes:
*                       type: array
*                       items:
*                           type: string
*                       description: Arreglo de id´s de los expedientes que se encuentran en esta caja
*                   nombre:
*                       type: string
*                       description: Nombre asignado a la estantería
*           Estante:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del empleado
*                   ejex:
*                       type: number
*                       description: Valor en el eje x que se encuentra el estante
*                   ejey:
*                       type: number
*                       description: Valor en el eje y que se encuentra el estante
*                   ejez:
*                       type: number
*                       description: Valor en el eje z que se encuentra el estante
*                   alto:
*                       type: number
*                       description: Valor del alto en el que se encuentra el estante
*                   ancho:
*                       type: number
*                       description: Valor del ancho en el que se encuentra el estante
*                   nombre:
*                       type: string
*                       description: Nombre asignado a la estantería
*           Empleado:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del empleado
*                   nombre:
*                       type: string
*                       description: Nombre del usuario
*           FiltroLogs:
*               type: object
*               properties:
*                   begin:
*                       type: string
*                       description: Fecha en formato YYYY-MM-DD representa la fecha inicial a donde se comienza el filtrado
*                   end:
*                       type: string
*                       description: Fecha en formato YYYY-MM-DD representa la fecha final a donde se comienza el filtrado
*                   user:
*                       type: string
*                       description: Id del usuario a buscar
*                   limit:
*                       type: number
*                       description: Limite de resultados que desea obtener
*           Log:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del registro del log
*                   descripcion:
*                       type: string
*                       description: Descripción de la acción realizada
*                   fecha:
*                       type: string
*                       description: Fecha en la que se realizó esta acción
*                   idUsuario:
*                       type: string
*                       description: Usuario que realizó esta acción
*                   operacion:
*                       type: string
*                       description: Operación que fue realizada
*           Permiso:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del permiso
*                   idTipoUsuario:
*                       type: string
*                       description: Id del tipo de usuario al que representa este permiso
*                   permisoExpedientes:
*                       type: number
*                       description: Permiso que posee este rol para los expedientes, puede ser 0, 1, 2 y 3
*                   permisoLibros:
*                       type: number
*                       description: Permiso que posee este rol para los libros, puede ser 0, 1, 2 y 3
*                   verExpedientesProceso:
*                       type: boolean
*                       description: Identifica si este rol puede ver los expedientes que se están procesando en este momento
*                   verLibrosProceso:
*                       type: boolean
*                       description: Identifica si este rol puede ver los libros que se están procesando en este momento
*                   abreviatura:
*                       type: string
*                       description: Abreviatura del rol de usuario
*                   nombre:
*                       type: string
*                       description: Nombre del rol de usuario
*           PermisoUpdate:
*               type: object
*               properties:
*                   id:
*                       type: string
*                       description: Id del permiso
*                   permisoExpedientes:
*                       type: number
*                       description: Permiso que posee este rol para los expedientes, puede ser 0, 1, 2 y 3
*                   permisoLibros:
*                       type: number
*                       description: Permiso que posee este rol para los libros, puede ser 0, 1, 2 y 3
*                   verExpedientesProceso:
*                       type: boolean
*                       description: Identifica si este rol puede ver los expedientes que se están procesando en este momento
*                   verLibrosProceso:
*                       type: boolean
*                       description: Identifica si este rol puede ver los libros que se están procesando en este momento
*/