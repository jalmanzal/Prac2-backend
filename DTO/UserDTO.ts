export default class UserDTO {
    private name:string

    private lastName:string

    private motherLastName:string

    private ssn:string

    private email:string

    private age:number

    private password:string

    constructor() {
      this.name = '';
      this.lastName = '';
      this.motherLastName = '';
      this.ssn = '';
      this.email = '';
      this.password = '';
      this.age = 0;
    }

    getName():string {
      return this.name;
    }

    setName(name: string):void {
      this.name = name;
    }

    getLastName():string {
      return this.lastName;
    }

    setLastName(lastName: string):void {
      this.lastName = lastName;
    }

    getMotherLastName():string {
      return this.motherLastName;
    }

    setMotherLastName(motherLastName: string):void {
      this.motherLastName = motherLastName;
    }

    getSsn():string {
      return this.ssn;
    }

    setSsn(ssn: string):void {
      this.ssn = ssn;
    }

    getEmail():string {
      return this.email;
    }

    setEmail(email: string):void {
      this.email = email;
    }

    getAge():number {
      return this.age;
    }

    setAge(age: number):void {
      this.age = age;
    }

    getPassword():string {
      return this.password;
    }

    setPassword(password: string):void {
      this.password = password;
    }
}
