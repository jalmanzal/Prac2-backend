"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const koa_router_1 = __importDefault(require("koa-router"));
const SaveData_1 = __importDefault(require("../../controller/SaveData"));
const UserDTO_1 = __importDefault(require("../../DTO/UserDTO"));
// Assets
const router = new koa_router_1.default();
// Method
router.post('/users', async (ctx) => {
    const DATOS = ctx.request.body;
    /**
     * Validates if fields have content
     */
    if (!DATOS.name || !DATOS.lastName || !DATOS.ssn || !DATOS.email
        || DATOS.age < 1 || !DATOS.password) {
        // eslint-disable-next-line no-nested-ternary
        const CAMPO = (!DATOS.name) ? 'nombre' : ((!DATOS.lastName) ? 'apellido paterno' : ((!DATOS.ssn)
            ? 'Numero de Seguro Social' : ((!DATOS.email) ? 'correo' : 'contraseña')));
        ctx.status = 400;
        ctx.body = {
            status: 'Invalid Content',
            message: (DATOS.age > 1) ? `El campo ${CAMPO} no puede ir vacío!` : 'Edad invalida!',
        };
    }
    else {
        const USERDTO = new UserDTO_1.default();
        USERDTO.setName(DATOS.name);
        USERDTO.setLastName(DATOS.lastName);
        USERDTO.setMotherLastName(DATOS.motherLastName);
        USERDTO.setSsn(DATOS.ssn);
        USERDTO.setEmail(DATOS.email);
        USERDTO.setAge(DATOS.age);
        USERDTO.setPassword(DATOS.password);
        /**
         * Save information and get an array with code and JSON to respond depending of status
         * @param USERDTO
         */
        [ctx.status, ctx.body] = await new SaveData_1.default(USERDTO).exec();
    }
});
exports.default = router;
//# sourceMappingURL=newUser.js.map