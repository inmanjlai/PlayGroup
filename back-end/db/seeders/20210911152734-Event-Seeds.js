'use strict';
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', [

        {hostId: 1, gameId: 1, date: faker.date.future(), locationId: 1 },
        {hostId: 2, gameId: 2, date: faker.date.future(), locationId: 2 },
        {hostId: 3, gameId: 3, date: faker.date.future(), locationId: 3 },
        {hostId: 1, gameId: 4, date: faker.date.future(), locationId: 4 },
        {hostId: 2, gameId: 5, date: faker.date.future(), locationId: 5 },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Events', null, {});

  }
};
