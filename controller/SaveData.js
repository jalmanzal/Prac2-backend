"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
class SaveData {
    constructor(usrDTO) {
        this.usrDTO = usrDTO;
    }
    /**
     * Perform a save to database into both tables
     * It get data from DTO instance
     */
    // eslint-disable-next-line class-methods-use-this
    async exec() {
        try {
            let CONSECUTIVE = (await models_1.default.Credentials.findAll()).length;
            const VALIDATION = await models_1.default.Users.findOne({
                where: {
                    email: this.usrDTO.getEmail(),
                    ssn: this.usrDTO.getSsn(),
                },
            });
            if (VALIDATION === null) {
                const USER = {
                    name: this.usrDTO.getName(),
                    lastName: this.usrDTO.getLastName(),
                    motherLastName: this.usrDTO.getMotherLastName(),
                    age: this.usrDTO.getAge(),
                    email: this.usrDTO.getEmail(),
                    ssn: this.usrDTO.getSsn(),
                };
                const CREDENTIAL = {
                    // eslint-disable-next-line no-plusplus
                    userId: ++CONSECUTIVE,
                    password: this.usrDTO.getPassword(),
                };
                await models_1.default.Users.create(USER);
                await models_1.default.Credentials.create(CREDENTIAL);
                return [201, {
                        status: 'Success',
                        message: `Se ha guardado el usuario ${this.usrDTO.getName()} con éxito!`,
                    }];
            }
            return [409, {
                    status: 'Conflict',
                    message: `Los datos del usuario ${this.usrDTO.getName()} ya existen!`,
                }];
        }
        catch (err) {
            console.error(err);
            return [500, {
                    status: 'Error',
                    message: 'Ha ocurrido un error fatal!',
                }];
        }
    }
}
exports.default = SaveData;
//# sourceMappingURL=SaveData.js.map