'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Material.belongsTo(models.MaterialCategory, {
    foreignKey: 'categoryId'
  });
  // One material can be used in many project records
Material.hasMany(models.ProjectMaterial, {
  foreignKey: 'materialId',
  onDelete: 'CASCADE'
});
    }
  }
  Material.init({
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};