"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProjectWorkers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      workerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Workers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      daysWorked: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      dailyWage: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      totalCost: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProjectWorkers");
  },
};
