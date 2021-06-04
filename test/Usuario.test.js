// Dependencies
const chaiHttp = require('chai-http');
const chai = require('chai');

// Assets
const server = require('../src/app');

// Assertion
chai.should();
chai.use(chaiHttp);

describe('Creación de usuario', () => {
  it('Debe de crear el usuario', (done) => {
    const nombre = 'Mocha';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '666666666666666',
        age: 3,
        email: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(201);
        res.type.should.equal('application/json');
        res.body.message.should.eql(`Se ha guardado el usuario ${nombre} con éxito!`);
        done();
      });
  });

  it('Debe de dar error al mandar nombre vacío', (done) => {
    const nombre = '';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '666666666666666',
        age: 3,
        email: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('El campo nombre no puede ir vacío!');
        done();
      });
  });

  it('Debe de dar error al mandar apellido paterno vacío', (done) => {
    const nombre = 'Chai';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: '',
        motherLastName: '',
        ssn: '666666666666666',
        age: 3,
        email: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('El campo apellido paterno no puede ir vacío!');
        done();
      });
  });

  it('Debe de dar error al mandar Numero de Seguro Social vacío', (done) => {
    const nombre = 'Chai';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '',
        age: 3,
        email: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('El campo Numero de Seguro Social no puede ir vacío!');
        done();
      });
  });

  it('Debe de dar error al mandar a un usuario recien nacido', (done) => {
    const nombre = 'Chai';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '666666666666666',
        age: 0,
        email: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('Edad invalida!');
        done();
      });
  });

  it('Debe de dar error al mandar correo vacío', (done) => {
    const nombre = 'Chai';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '666666666666666',
        age: 3,
        email: '',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('El campo correo no puede ir vacío!');
        done();
      });
  });

  it('Debe de dar error al mandar contraseña vacía', (done) => {
    const nombre = 'Chai';
    chai
      .request(server)
      .post('/users')
      .type('form')
      .send({
        name: nombre,
        lastName: 'Mocha',
        motherLastName: '',
        ssn: '666666666666666',
        age: 3,
        email: 'prueba@mail.com',
        password: '',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal('application/json');
        res.body.message.should.eql('El campo contraseña no puede ir vacío!');
        done();
      });
  });
});

describe('Inicio de sesión', () => {
  it('Al iniciar sesión debe de devolver la lista de usuarios', (done) => {
    chai
      .request(server)
      .post('/login')
      .type('form')
      .send({
        correo: 'prueba@mail.com',
        password: '123456',
      })
      .end((err, res) => {
        res.status.should.equal(202);
        res.body.should.have.property('message').eq('Acceso correcto!');
        res.body.should.have.property('usuarios');
        done();
      });
  });

  it('Debe dar error por contraseña invalida', (done) => {
    chai
      .request(server)
      .post('/login')
      .type('form')
      .send({
        correo: 'prueba@mail.com',
        password: '12346',
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('message').eq('Contraseña incorrecta!');
        done();
      });
  });

  it('Debe dar error por correo invalido', (done) => {
    chai
      .request(server)
      .post('/login')
      .type('form')
      .send({
        correo: 'prueba2@mail.com',
        password: '12346',
      })
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.should.have.property('message').eq('Usuario inexistente!');
        done();
      });
  });
});
