const request = require('supertest');
const app = require('../index.js');
const { TEST_CONFIG } = require('../config/config.js');

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
  test("Debería responder con un status 401", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "usuario",
      password: "quenoexiste"
    })
    expect(response.statusCode).toBe(401);
  });
});

describe("Pruebas a los endpoints de permisos", () => {
  // OBTENER UN ARREGLO DE PERMISOS
  test("Debería responder con un status 200", async () => {
    const response = await request(app).get("/permisos/getPermisos").send()
    expect(response.statusCode).toBe(200);
  });
});

describe("Pruebas a los endpoints de filtros", () => {
  // OBTENER LOS USUARIOS DEL SISTEMA
  test("Debería responder con un status 200", async () => {
    const response = await request(app).get("/filter/getUsuarios").send()
    .set('Authorization', `Bearer ${TEST_CONFIG.SAMPLE_TOKEN}`);
    expect(response.statusCode).toBe(200);
  });
});