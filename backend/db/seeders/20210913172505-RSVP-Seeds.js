'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

      return queryInterface.bulkInsert('RSVPs', [
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
        {userId: getRandomInt(1, 11), eventId: getRandomInt(1, 6)},
      ], {});
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('RSVPs', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
