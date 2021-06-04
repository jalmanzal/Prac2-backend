import ITransaction from './ITransaction';
import db from '../models';

export default class SaveData implements ITransaction {
  usrDTO: any

  constructor(usrDTO: object) {
    this.usrDTO = usrDTO;
  }

  /**
   * Perform a save to database into both tables
   * It get data from DTO instance
   */
  // eslint-disable-next-line class-methods-use-this
  async exec(): Promise<[number, object]> {
    try {
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
    } catch (err) {
      return [500, {
        status: 'Error',
        message: 'Ha ocurrido un error fatal!',
      }];
    }
  }
}
