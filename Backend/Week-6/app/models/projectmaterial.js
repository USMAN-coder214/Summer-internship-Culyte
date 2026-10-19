'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  // This record belongs to one project
  ProjectMaterial.belongsTo(models.Project, {
    foreignKey: 'projectId'
  });

  // This record belongs to one material
  ProjectMaterial.belongsTo(models.Material, {
    foreignKey: 'materialId'
  });
}
  }
  ProjectMaterial.init({
    projectId: DataTypes.INTEGER,
    materialId: DataTypes.INTEGER,
    quantity: DataTypes.DECIMAL,
    unitPrice: DataTypes.DECIMAL,
    totalCost: DataTypes.DECIMAL,
    purchaseDate: DataTypes.DATE,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProjectMaterial',
    tableName: 'projectmaterials',
  });
  return ProjectMaterial;
};