'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Groups', [
        {
          name: "Battlecruiser Bros",
          image:"https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/7/97fa8615-2b6c-445a-bcaf-44a7e847bf65.jpg?1562411365",
          description: "Welcome to our group!, we are a causal playgroup of Commander players. We generally play battlecruiser type games. No infinites allowed here.",
          ownerId: 1
        },
        {
          name: "Modern Masters", 
          image:"https://c1.scryfall.com/file/scryfall-cards/art_crop/front/7/a/7af082fa-86a3-4f7b-966d-2be1f1d0c0bc.jpg?1584830010",
          description: "Welcome to our group!, we are a competitive playgroup of Modern players. We generally play the meta. Any playstyle allowed.",
          ownerId: 2
        },
        {
          name: "Pauper Pals", 
          image:"https://c1.scryfall.com/file/scryfall-cards/art_crop/front/6/1/6109b54e-56c5-4014-9f6d-d5f7a0fd725d.jpg?1630610048",
          description: "Welcome to our group!, we are a causal playgroup of Pauper players. We generally play both casual and competitive games. All cards in your deck must be common rarity.",
          ownerId: 3
        }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Groups', null, {});
  }
};
