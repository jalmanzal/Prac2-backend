"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const UserDTO_1 = __importDefault(require("../../DTO/UserDTO"));
const ReadData_1 = __importDefault(require("../../controller/ReadData"));
const router = new koa_router_1.default();
router.post('/login', async (ctx) => {
    const DATOS = ctx.request.body;
    /**
     * Validates if fields have content
     */
    if (!DATOS.email || !DATOS.password) {
        const CAMPO = (!DATOS.email) ? 'correo' : 'contraseña';
        ctx.status = 400;
        ctx.body = {
            status: 'Invalid Content',
            message: `El campo ${CAMPO} no puede ir vacío!`,
        };
    }
    else {
        const USERDTO = new UserDTO_1.default();
        USERDTO.setEmail(DATOS.email);
        USERDTO.setPassword(DATOS.password);
        /**
         * Read information and get an array with code and JSON to respond depending of status
         * @param USERDTO
         */
        [ctx.status, ctx.body] = await new ReadData_1.default(USERDTO).exec();
    }
});
exports.default = router;
//# sourceMappingURL=login.js.map