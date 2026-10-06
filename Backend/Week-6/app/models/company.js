'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // Each company belongs to one user
        // One company can have many construction projects
  Company.hasMany(models.Project, {
    foreignKey: 'companyId',
    onDelete: 'CASCADE'
  });
  Company.belongsTo(models.User, {
    foreignKey: 'userId'
  });
  // One company can have many workers
Company.hasMany(models.Worker, {
  foreignKey: 'companyId',
  onDelete: 'CASCADE'
});
    }
  }
  Company.init({
    userId: DataTypes.INTEGER,
    companyName: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};