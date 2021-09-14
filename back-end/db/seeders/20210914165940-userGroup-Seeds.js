'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('userGroups', [
        {userId: 1, groupId: 1},
        {userId: 2, groupId: 2},
        {userId: 3, groupId: 3},
        {userId: 1, groupId: 3},
        {userId: 2, groupId: 3},
        {userId: 1, groupId: 2},
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('userGroups', null, {});
  }
};
