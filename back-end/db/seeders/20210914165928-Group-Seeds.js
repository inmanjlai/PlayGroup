'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Groups', [
        {
          name: "Battlecruiser Homies", 
          description: "Welcome to our group!, we are a causal playgroup of Commander players. We generally play battlecruiser type games. No infinites allowed here.",
          ownerId: 1
        },
        {
          name: "Standard Bros", 
          description: "Welcome to our group!, we are a competitive playgroup of Standard players. We generally play the meta. Any playstyle allowed.",
          ownerId: 2
        },
        {
          name: "Pauper Buddies", 
          description: "Welcome to our group!, we are a causal playgroup of Pauper players. We generally play both casual and competitive games. All cards in your deck must be common rarity.",
          ownerId: 3
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Groups', null, {});
  }
};
