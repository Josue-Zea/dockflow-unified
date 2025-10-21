# MS Windows Files

Microservicio para gestionar documentos PDF en el sistema de archivos local (Windows).

## Endpoints

Base path: `/files`

- `POST /files/document`
  - Body: `{ "pdfBase64": string, "documentName": string, "documentType": string }`
  - Guarda el PDF en el disco en `FILES_BASE_PATH/documentType/documentName.pdf`.
- `GET /files/document`
  - Query params: `documentName`, `documentType` (también aceptados en el body).
  - Devuelve `{ documentName, documentType, pdfBase64 }`.
- `DELETE /files/document`
  - Query params o body con `documentName`, `documentType`.
  - Elimina el PDF almacenado.

## Configuración

Variables de entorno disponibles en `.env`:

```
SERVER_PORT=3010
FILES_BASE_PATH=C:/Documents
```

`FILES_BASE_PATH` determina la ruta raíz en donde se almacenan los archivos. Cada documento se coloca en una subcarpeta con el nombre del `documentType`. El microservicio crea las carpetas si no existen.

Instalación con Yarn:

```
yarn install
yarn start
```
