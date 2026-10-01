'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", [

            {
                name: "Dell Laptop",
                price: 150000,
                category: "Electronics"
            },

            {
                name: "HP Laptop",
                price: 120000,
                category: "Electronics"
            },

            {
                name: "Wireless Mouse",
                price: 2500,
                category: "Accessories"
            },

            {
                name: "Mechanical Keyboard",
                price: 8500,
                category: "Accessories"
            },

            {
                name: "Samsung Monitor",
                price: 45000,
                category: "Electronics"
            },

            {
                name: "iPhone 15",
                price: 250000,
                category: "Electronics"
            },

            {
                name: "USB-C Cable",
                price: 1800,
                category: "Accessories"
            },

            {
                name: "Office Chair",
                price: 35000,
                category: "Furniture"
            },

            {
                name: "Study Table",
                price: 28000,
                category: "Furniture"
            },

            {
                name: "Gaming Mouse",
                price: 5500,
                category: "Accessories"
            },

            {
                name: "Lenovo Laptop",
                price: 135000,
                category: "Electronics"
            },

            {
                name: "LG Monitor",
                price: 55000,
                category: "Electronics"
            },

            {
                name: "Webcam",
                price: 7000,
                category: "Accessories"
            },

            {
                name: "Bookshelf",
                price: 22000,
                category: "Furniture"
            },

            {
                name: "Gaming Keyboard",
                price: 12000,
                category: "Accessories"
            },

            {
                name: "HP Monitor",
                price: 40000,
                category: "Electronics"
            },

            {
                name: "Laptop Stand",
                price: 4500,
                category: "Accessories"
            },

            {
                name: "Computer Desk",
                price: 30000,
                category: "Furniture"
            },

            {
                name: "MacBook Air",
                price: 280000,
                category: "Electronics"
            },

            {
                name: "Bluetooth Speaker",
                price: 6500,
                category: "Accessories"
            }

        ]);

    },
 

  async down(queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('People', null, {});
     
  }
   }

