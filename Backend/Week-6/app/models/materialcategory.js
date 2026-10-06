'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaterialCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       MaterialCategory.hasMany(models.Material, {
    foreignKey: 'categoryId',
    onDelete: 'CASCADE'
  });
    }
  }
  MaterialCategory.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MaterialCategory',
  });
  return MaterialCategory;
};