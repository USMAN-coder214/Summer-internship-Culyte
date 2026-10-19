'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Every task belongs to one project
Task.belongsTo(models.Project, {
  foreignKey: 'projectId'
});
    }
  }
  Task.init({
    projectId: DataTypes.INTEGER,
    taskName: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    startDate: DataTypes.DATE,
    expectedEndDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
  });
  return Task;
};