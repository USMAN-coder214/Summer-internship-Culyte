'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     companyId: {
  allowNull: false,
  type: Sequelize.INTEGER,
  references: {
    model: 'Companies',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
      projectName: {
        type: Sequelize.STRING
      },
      projectType: {
        type: Sequelize.STRING
      },
      plotLocation: {
        type: Sequelize.STRING
      },
      plotSize: {
        type: Sequelize.DECIMAL
      },
      plotUnit: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      expectedEndDate: {
        type: Sequelize.DATE
      },
      status: {
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
    await queryInterface.dropTable('Projects');
  }
};