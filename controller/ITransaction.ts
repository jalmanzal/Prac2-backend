export default interface ITransaction {
  usrDTO: any

  /**
   * Perform a implemented operation
   */
  exec(): any;
};
