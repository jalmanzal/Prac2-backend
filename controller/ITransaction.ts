import UserDTO from '../DTO/UserDTO';

export default interface ITransaction {
  usrDTO: UserDTO

  /**
   * Perform a implemented operation
   */
  exec(): Promise<[number, object]>;
};
