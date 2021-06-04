'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    motherLastName: DataTypes.STRING,
    age: DataTypes.NUMBER,
    email: DataTypes.STRING,
    ssn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};