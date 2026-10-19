'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One project can have many expenses
     // Every expense belongs to one project
Expense.belongsTo(models.Project, {
  foreignKey: 'projectId'
});
    }
  }
  Expense.init({
    projectId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    expenseDate: DataTypes.DATE,
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
  });
  return Expense;
};