'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
  allowNull: false,
  type: Sequelize.INTEGER,
  references: {
    model: 'MaterialCategories',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
      name: {
         allowNull: false,
        type: Sequelize.STRING
      },
      unit: {
         allowNull: false,
        type: Sequelize.STRING
      },
      description: {
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
    await queryInterface.dropTable('Materials');
  }
};