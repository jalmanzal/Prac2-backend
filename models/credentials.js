const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Credentials.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Credentials.init({
    userId: DataTypes.NUMBER,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Credentials',
  });
  return Credentials;
};
