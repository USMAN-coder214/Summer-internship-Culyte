'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Worker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Every worker belongs to one company
Worker.belongsTo(models.Company, {
  foreignKey: 'companyId'
});
// One worker can work on many projects
Worker.hasMany(models.ProjectWorker, {
  foreignKey: 'workerId',
  onDelete: 'CASCADE'
});
    }
  }
  Worker.init({
    companyId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    skill: DataTypes.STRING,
    dailyWage: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Worker',
    tableName: 'workers',
  });
  return Worker;
};