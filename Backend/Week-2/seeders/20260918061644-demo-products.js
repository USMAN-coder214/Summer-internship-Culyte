'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Products', [
    {
      name: 'Laptop',
      price: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Mouse',
      price: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Keyboard',
      price: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
