const request = require('supertest');
const app = require('../index.js');
const { ADMIN_CONFIG } = require('../config/config.js');

describe("Pruebas al endpoint de autenticación", () => {
  // LOGUEARSE CON EL USUARIO DE PRUEBAS
  test("Debería responder con un status 200", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "TEST1",
      password: "test1"
    })
    expect(response.statusCode).toBe(200);
  });

  // LOGUEARSE CON UN USUARIO QUE NO EXISTE
  test("Debería responder con un status 400", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "usuario",
      password: "quenoexiste"
    })
    expect(response.statusCode).toBe(400);
  });

  // OBTENER EL JWT DE LA AUTENTICACIÓN
  test("Debería contener un token de autenticación", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "TEST1",
      password: "test1"
    })
    expect(response.body.token).toBeDefined();
  });
});

describe("Pruebas a los endpoints de permisos", () => {
  // OBTENER UN ARREGLO DE PERMISOS
  test("Debería responder con un status 200", async () => {
    const response = await request(app).get("/permisos/getPermisos").send()
    .set('Authorization', `Bearer ${ADMIN_CONFIG.SAMPLE_TOKEN}`);
    expect(response.statusCode).toBe(200);
  });

  // ERROR POR INTENTAR ACCEDER AL ENDPOINT SIN EL TOKEN
  test("Debería responder con un status 200", async () => {
    const response = await request(app).get("/permisos/getPermisos").send()
    expect(response.statusCode).toBe(401);
  });
});

// describe("Pruebas a los endpoints de expedientes", () => {
//   // OBTENER UN EXPEDIENTE EXISTENTE
//   test("Debería responder con un status 200", async () => {
//     const response = await request(app).post("/expedientes/getExpediente").send({
//       numero_expediente: "112758",
//       anio_expediente: "2023"
//     })
//     .set('Authorization', `Bearer ${ADMIN_CONFIG.SAMPLE_TOKEN}`);
//     expect(response.statusCode).toBe(200);
//   }, 15000);

//   // OBTENER UN EXPEDIENTE INTEXISTENTE
//   test("Debería responder con un status 400", async () => {
//     const response = await request(app).post("/expedientes/getExpediente").send({
//       numero_expediente: "112758",
//       anio_expediente: "202321"
//     })
//     .set('Authorization', `Bearer ${ADMIN_CONFIG.SAMPLE_TOKEN}`);
//     expect(response.statusCode).toBe(400);
//   });

//   // NO ENVIAR EL BODY COMPLETO
//   test("Debería responder con un status 400", async () => {
//     const response = await request(app).post("/expedientes/getExpediente").send({
//       numero_expediente: "112758"
//     })
//     .set('Authorization', `Bearer ${ADMIN_CONFIG.SAMPLE_TOKEN}`);
//     expect(response.statusCode).toBe(400);
//   });
// });

describe("Pruebas a los endpoints de filtros", () => {
  // OBTENER LOS USUARIOS DEL SISTEMA
  test("Debería responder con un status 200", async () => {
    const response = await request(app).get("/filter/getUsuarios").send()
    .set('Authorization', `Bearer ${ADMIN_CONFIG.SAMPLE_TOKEN}`);
    expect(response.statusCode).toBe(200);
  });

  // ERROR POR FALTA DE TOKEN
  test("Debería responder con un status 401", async () => {
    const response = await request(app).get("/filter/getUsuarios").send()
    expect(response.statusCode).toBe(401);
  });
});

app.close();