"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControladorNuevaCredencial = exports.ControladorNuevoUsuario = void 0;
const models_1 = __importDefault(require("../models"));
class ControladorNuevoUsuario {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async exec() {
        try {
            const Usuario = models_1.default.Usuario;
            await Usuario.create(this.ctx.request.body);
        }
        catch (err) {
            console.error(err);
            this.ctx.status = 500;
            this.ctx.body = {
                status: "Error",
                message: "Ha ocurrido un error fatal!",
            };
        }
    }
}
exports.ControladorNuevoUsuario = ControladorNuevoUsuario;
class ControladorNuevaCredencial {
    constructor(ctx) {
        this.ctx = ctx;
    }
    async exec() {
        try {
            const Credencial = models_1.default.Credencial;
            await Credencial.create(this.ctx.request.body);
            this.ctx.status = 201;
            this.ctx.body = {
                status: "Success",
                message: "Se ha creado el usuario con exito!",
            };
        }
        catch (err) {
            console.error(err);
            this.ctx.status = 500;
            this.ctx.body = {
                status: "Error",
                message: "Ha ocurrido un error fatal!",
            };
        }
    }
}
exports.ControladorNuevaCredencial = ControladorNuevaCredencial;
//# sourceMappingURL=controladorNuevoUsuario.js.map