'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       // One user owns one company
  User.hasOne(models.Company, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
    }
  }
  User.init({
  // User's name
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Email is required and must be unique
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  // We will store the bcrypt hash here, NOT the plain password
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',

  // Automatically manages createdAt and updatedAt
  timestamps: true
});
  return User;
};