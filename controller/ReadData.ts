import ITransaction from './ITransaction';
import UserDTO from '../DTO/UserDTO';

import db from '../models';

export default class ReadData implements ITransaction {
    usrDTO: UserDTO;

    constructor(usrDTO: UserDTO) {
      this.usrDTO = usrDTO;
    }

    /**
   * Find from database email and password, if it exist, return a list with all users
   * else, it trows an error
   * It get data from DTO instance
   */
    // eslint-disable-next-line class-methods-use-this
    async exec(): Promise<[number, object]> {
      try {
        const CREDENTIALS: any = await db.Credentials.findOne({
          where: {
            email: this.usrDTO.getEmail(),
            password: this.usrDTO.getPassword(),
          },
        });

        if (CREDENTIALS !== null) {
          const USERS = await db.Users.findAll();

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
        return [401, {
          status: 'Error',
          message: 'Credenciales invalidas, intente de nuevo por favor!',
        }];
      } catch (err) {
        return [500, {
          status: 'Error',
          message: 'Ha ocurrido un error fatal!',
        }];
      }
    }
}
