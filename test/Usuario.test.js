// Dependencies
const chaiHttp = require("chai-http");
const chai = require("chai");

// Assets
const server = require("../src/app");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Prueba 1", () => {
  it("Debe de crear el usuario ", async () => {
    const res = await chai
      .request(server)
      .post("/nuevo-usuario")
      .type("form")
      .send({
        nombre: "Chai",
        apPat: "Mocha",
        apMat: "",
        correo: "prueba@mail.com",
        nss: "666666666666666",
        edad: 3,
        password: "123456",
      });
    res.should.have.status(201);
    JSON.parse(res.text)
      .should.have.property("message")
      .eq("Se creó el usuario con exito!");
  }).timeout(1000);
});

describe("Prueba 2", () => {
  it("Al iniciar sesion debe de devolver la lista de usuarios", async () => {
    const res = await chai.request(server).post("/login").type("form").send({
      correo: "prueba@mail.com",
      password: "123456",
    });
    res.should.have.status(202);
    JSON.parse(res.text).should.have.property("message").eq("Acceso correcto!");
    JSON.parse(res.text).should.have.property("usuarios");
  }).timeout(1000);
});
