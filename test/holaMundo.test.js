// Dependencies
const chaiHttp = require("chai-http");
const chai = require("chai");

// Assets
const server = require("../src/app");

// Assertion
chai.should();
chai.use(chaiHttp);

// es-lint-disable-next-line no-undef
describe("Prueba 1", () => {
  it("Debe de dar 200 ", async () => {
    const res = await chai.request(server).get("/hola");
    res.should.have.status(200);
  }).timeout(1000);
});

describe("Prueba 2", () => {
  it("Debe decir 'Hola Mundo'", async () => {
    const res = await chai.request(server).get("/hola");
    JSON.parse(res.text).should.have.property("message").eq("Hola Mundo");
  }).timeout(1000);
});
