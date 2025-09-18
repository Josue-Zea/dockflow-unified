const request = require('supertest');
const app = require('../index.js');

describe("Pruebas a los endpoints de expedientes", () => {
  // OBTENER UN EXPEDIENTE EXISTENTE
  test("Debería responder con un status 200", async () => {
    const response = await request(app).post("/expedientes/getExpediente").send({
      numero_expediente: "112758",
      anio_expediente: "2023"
    })
    expect(response.statusCode).toBe(200);
  }, 15000);

  // OBTENER UN EXPEDIENTE INTEXISTENTE
  test("Debería responder con un status 400", async () => {
    const response = await request(app).post("/expedientes/getExpediente").send({
      numero_expediente: "112758",
      anio_expediente: "202321"
    })
    expect(response.statusCode).toBe(400);
  });

  // NO ENVIAR EL BODY COMPLETO
  test("Debería responder con un status 400", async () => {
    const response = await request(app).post("/expedientes/getExpediente").send({
      numero_expediente: "112758"
    })
    expect(response.statusCode).toBe(400);
  });
});