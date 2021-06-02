// Dependencies
const chaiHttp = require("chai-http");
const chai = require("chai");

// Assets
const server = require("../src/app");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Prueba 1", () => {
  it("Debe de crear el usuario ", (done) => {
    chai
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
      })
      .end((err, res) => {
        res.status.should.equal(201);
        res.type.should.equal("application/json");
        res.body.message.should.eql("Se ha creado el usuario con exito!");
        done();
      });
  });
});

describe("Prueba 2", () => {
  it("Al iniciar sesion debe de devolver la lista de usuarios", (done) => {
    chai
      .request(server)
      .post("/login")
      .type("form")
      .send({
        correo: "prueba@mail.com",
        password: "123456",
      })
      .end((err, res) => {
        res.status.should.equal(202);
        res.body.should.have.property("message").eq("Acceso correcto!");
        res.body.should.have.property("usuarios");
        done();
      });
  });
});
