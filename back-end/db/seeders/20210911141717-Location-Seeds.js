'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Locations', [

      {name: "Fun 4 All Comics & Games", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Stadium Cards and Comics", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Pandemonium Games and Hobbies", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Ish's Place", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Hasan's House", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Gamers Gambit", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Card Kingdom", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "A To Z Cards, Comics and Coins", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Loot Card Shop", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "The Wandering Pawn", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},
      {name: "Golden Rhino Games", address: faker.address.streetAddress(), city: faker.address.city(), state: faker.address.state(), zipcode: faker.address.zipCode("#####")},

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Locations', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
