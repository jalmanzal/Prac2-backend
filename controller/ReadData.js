"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class ReadData {
    constructor(usrDTO) {
        this.usrDTO = usrDTO;
    }
    /**
   * Find from database email and password, if it exist, return a list with all users
   * else, it trows an error
   * It get some data from DTO instance
   */
    // eslint-disable-next-line class-methods-use-this
    async exec() {
        try {
            const EMAIL = await models_1.default.Users.findOne({
                where: {
                    email: this.usrDTO.getEmail(),
                },
            });
            if (EMAIL !== null) {
                const CREDENTIALS = await models_1.default.Credentials.findOne({
                    where: {
                        userId: EMAIL.dataValues.id,
                        password: this.usrDTO.getPassword(),
                    },
                });
                if (CREDENTIALS !== null) {
                    const USERS = await models_1.default.Users.findAll();
                    const OUTPUT = USERS.map((i) => ({
                        name: i.dataValues.name,
                        lastName: i.dataValues.lastName,
                        motherLastName: i.dataValues.motherLastName,
                        age: i.dataValues.age,
                        email: i.dataValues.email,
                        ssn: i.dataValues.ssn,
                    }));
                    return [202, {
                            status: 'Success',
                            message: 'Acceso correcto!',
                            users: OUTPUT,
                        }];
                }
            }
            return [401, {
                    status: 'Error',
                    message: 'Credenciales invalidas, intente de nuevo por favor!',
                }];
        }
        catch (err) {
            return [500, {
                    status: 'Error',
                    message: 'Ha ocurrido un error fatal!',
                }];
        }
    }
}
exports.default = ReadData;
//# sourceMappingURL=ReadData.js.map