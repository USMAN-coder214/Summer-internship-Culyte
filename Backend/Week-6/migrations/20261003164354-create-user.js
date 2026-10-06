'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  // User's name cannot be empty
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },

  // Email is required and must be unique
  email: {
    allowNull: false,
    unique: true,
    type: Sequelize.STRING
  },

  // Password field will contain the bcrypt hash
  password: {
    allowNull: false,
    type: Sequelize.STRING
  },

  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },

  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};