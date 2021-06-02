import IUsuario from "./IUsuario";
import db from "../models";

export class ControladorNuevoUsuario implements IUsuario {
  ctx: any;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async exec(): Promise<any> {
    try {
      const Usuario = db.Usuario;
      await Usuario.create(this.ctx.request.body);
    } catch (err) {
      console.error(err);
      this.ctx.status = 500;
      this.ctx.body = {
        status: "Error",
        message: "Ha ocurrido un error fatal!",
      };
    }
  }
}

export class ControladorNuevaCredencial implements IUsuario {
  ctx: any;

  constructor(ctx) {
    this.ctx = ctx;
  }

  async exec(): Promise<any> {
    try {
      const Credencial = db.Credencial;
      await Credencial.create(this.ctx.request.body);
      this.ctx.status = 201;
      this.ctx.body = {
        status: "Success",
        message: "Se ha creado el usuario con exito!",
      };
    } catch (err) {
      console.error(err);
      this.ctx.status = 500;
      this.ctx.body = {
        status: "Error",
        message: "Ha ocurrido un error fatal!",
      };
    }
  }
}
