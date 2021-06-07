import ITransaction from './ITransaction';
import db from '../models';
import UserDTO from '../DTO/UserDTO';

export default class SaveData implements ITransaction {
  usrDTO: UserDTO

  constructor(usrDTO: UserDTO) {
    this.usrDTO = usrDTO;
  }

  /**
   * Perform a save to database into both tables
   * It get data from DTO instance
   */
  // eslint-disable-next-line class-methods-use-this
  async exec(): Promise<[number, object]> {
    try {
      const VALIDATION = await db.Users.findOne({
        where: {
          email: this.usrDTO.getEmail(),
          ssn: this.usrDTO.getSsn(),
        },
      });

      if (VALIDATION === null) {
        const USER: object = {
          name: this.usrDTO.getName(),
          lastName: this.usrDTO.getLastName(),
          motherLastName: this.usrDTO.getMotherLastName(),
          age: this.usrDTO.getAge(),
          email: this.usrDTO.getEmail(),
          ssn: this.usrDTO.getSsn(),
        };
        const CREDENTIAL = {
          email: this.usrDTO.getEmail(),
          password: this.usrDTO.getPassword(),
        };

        await db.Users.create(USER);
        await db.Credentials.create(CREDENTIAL);

        return [201, {
          status: 'Success',
          message: `Se ha guardado el usuario ${this.usrDTO.getName()} con éxito!`,
        }];
      }
      return [409, {
        status: 'Conflict',
        message: `Los datos del usuario ${this.usrDTO.getName()} ya existen!`,
      }];
    } catch (err) {
      return [500, {
        status: 'Error',
        message: 'Ha ocurrido un error fatal!',
      }];
    }
  }
}
