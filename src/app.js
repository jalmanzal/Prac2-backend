"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const koa_logger_1 = __importDefault(require("koa-logger"));
// Assets
const hola_1 = __importDefault(require("./routes/hola"));
const nuevoUsuario_1 = __importDefault(require("./routes/nuevoUsuario"));
const APP = new koa_1.default();
const PORT = process.env.PUERTO || 3000;
// Middlewares
APP.use(koa_bodyparser_1.default())
    .use(koa2_cors_1.default({ origin: "*" }))
    .use(koa_logger_1.default())
    .use(hola_1.default.routes())
    .use(nuevoUsuario_1.default.routes());
// Creacion del servidor
const SERVER = APP.listen(PORT, async () => console.log(`Server listening on port ${PORT}`)).on("error", (err) => console.log(err));
module.exports = SERVER;
//# sourceMappingURL=app.js.map