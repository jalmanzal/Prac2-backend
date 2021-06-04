"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor() {
        this.name = '';
        this.lastName = '';
        this.motherLastName = '';
        this.ssn = '';
        this.email = '';
        this.password = '';
        this.age = 0;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getLastName() {
        return this.lastName;
    }
    setLastName(lastName) {
        this.lastName = lastName;
    }
    getMotherLastName() {
        return this.motherLastName;
    }
    setMotherLastName(motherLastName) {
        this.motherLastName = motherLastName;
    }
    getSsn() {
        return this.ssn;
    }
    setSsn(ssn) {
        this.ssn = ssn;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getAge() {
        return this.age;
    }
    setAge(age) {
        this.age = age;
    }
    getPassword() {
        return this.password;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.default = UserDTO;
//# sourceMappingURL=UserDTO.js.map