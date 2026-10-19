'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
  // One project can have many expenses
Project.hasMany(models.Expense, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});

   // One project can have many material records
  Project.hasMany(models.ProjectMaterial, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE'
  });

  // One project can have many worker assignments
Project.hasMany(models.ProjectWorker, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});
// One project can have many tasks
Project.hasMany(models.Task, {
  foreignKey: 'projectId',
  onDelete: 'CASCADE'
});
    }
  }
  Project.init({
    companyId: DataTypes.INTEGER,
    projectName: DataTypes.STRING,
    projectType: DataTypes.STRING,
    plotLocation: DataTypes.STRING,
    plotSize: DataTypes.DECIMAL,
    plotUnit: DataTypes.STRING,
    startDate: DataTypes.DATE,
    expectedEndDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects'
  });
  return Project;
};