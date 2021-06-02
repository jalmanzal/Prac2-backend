// Dependencies
const chaiHttp = require("chai-http");
const chai = require("chai");

// Assets
const server = require("../src/app");

// Assertion
chai.should();
chai.use(chaiHttp);

describe("Prueba 1", () => {
  it("Debe de dar 200 ", (done) => {
    chai
      .request(server)
      .get("/hola")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("message").eq("Hola Mundo");
        done();
      });
  });
});
