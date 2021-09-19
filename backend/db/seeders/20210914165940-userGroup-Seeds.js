'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

      return queryInterface.bulkInsert('userGroups', [
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
        {userId: getRandomInt(1, 11), groupId: getRandomInt(1, 4)},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('userGroups', null, {});
  }
};
