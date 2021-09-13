'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('RSVPs', [
        {userId: 1, eventId: 3},
        {userId: 1, eventId: 4},
        {userId: 2, eventId: 1},
        {userId: 2, eventId: 3},
        {userId: 3, eventId: 1},
        {userId: 3, eventId: 2},

      ], {});
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
