"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controladorNuevoUsuario_1 = require("../../controller/controladorNuevoUsuario");
const router = new koa_router_1.default();
router.post("/nuevo-usuario", async (ctx) => {
    const aux = { password: ctx.request.body.password };
    delete ctx.request.body.password;
    await new controladorNuevoUsuario_1.ControladorNuevoUsuario(ctx).exec();
    ctx.request.body = aux;
    await new controladorNuevoUsuario_1.ControladorNuevaCredencial(ctx).exec();
});
exports.default = router;
//# sourceMappingURL=nuevoUsuario.js.map