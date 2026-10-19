'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectWorker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Every project-worker record belongs to one project
ProjectWorker.belongsTo(models.Project, {
  foreignKey: 'projectId'
});

// Every project-worker record belongs to one worker
ProjectWorker.belongsTo(models.Worker, {
  foreignKey: 'workerId'
});
    }
  }
  ProjectWorker.init({
    projectId: DataTypes.INTEGER,
    workerId: DataTypes.INTEGER,
    daysWorked: DataTypes.DECIMAL,
    dailyWage: DataTypes.DECIMAL,
    totalCost: DataTypes.DECIMAL,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProjectWorker',
    tableName: 'projectworkers',
  });
  return ProjectWorker;
};