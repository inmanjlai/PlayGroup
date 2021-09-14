'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    // function getRandomInt(min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);
    //   return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    // } 
    // const chooseRandomFormat = (formats) => {
    //   const index = getRandomInt(0, formats.length)
    //   return formats[index];
    // }
    // const games = ["Magic: the Gathering"];
    // const formats = ["EDH/Commander", "Pauper", "PauperEDH", "Standard", "Modern", "Vintage", "Legacy", "Limited"]
    // const playerlimit = getRandomInt(2, 9)

    const EDH = {
      name: "EDH/Commander",
      description: "Created and popularized by fans, the Commander variant is usually played in casual Free-for-All multiplayer games, although two-player games are also popular. Each player starts at 40 life, and each player's deck is a minimum of 100 cards, headed by a legendary creature designated as that deck's commander. A player's choice of commander determines which other cards can be played in the deck (while except for basic lands, each card in the deck must have a different name).",
      playerlimit: 6
    }

    const Standard = {
      name: "Standard",
      description: "Standard is a dynamic format where you build decks and play using cards in your collection from recently released Magic sets. Evolving gameplay and fresh strategies make it one of the most fun and popular ways to play Magic.",
      playerlimit: 2
    }

    const Modern = {
      name: "Modern",
      description: "Modern is a constructed format that allows expansion sets, core sets, and Modern Horizons; from Eighth Edition forward, save for the Modern ban list. The modern format thus encompasses all cards that have been printed in a core or expansion set using the modern card frame (plus some others from Time Spiral).",
      playerlimit: 2
    }

    const Pauper = {
      name: "Pauper",
      description: "Pauper is a Magic variant in which card legality is based on rarity. Any cards that either have been printed as common in paper format or appeared as common in a Magic Online set at least once are legal.",
      playerlimit: 2
    }

    const PauperEDH = {
      name: "Pauper EDH/Pauper Commander",
      description: "Pauper Commander, like Commander, is a multiplayer format typically played in pods of 3-4 players (though 1v1 is also fairly popular). It has been around since the early 2000s with varying rulesets. The most universally accepted rules are that each player starts with 30 life and plays a deck of 99 unique common cards (excluding basic lands) headed by an uncommon creature that is the deck's commander. Another difference is that a player may only sustain 16 damage from a single commander. Otherwise, the rules follow those of Commander.",
      playerlimit: 4
    }


    const magicDescription = "Magic: The Gathering is a card game in which wizards cast spells, summon creatures, and exploit magic objects to defeat their opponents. In the game, two or more players each assemble a deck of cards with varying powers. They choose these decks from a pool of some 20,000 cards created as the game evolved."

    return queryInterface.bulkInsert('Games', [

      {name: EDH.name, description:  magicDescription, format: EDH.description, playerlimit: EDH.playerlimit},
      {name: Standard.name, description: magicDescription, format: Standard.description, playerlimit: Standard.playerlimit},
      {name: Modern.name, description: magicDescription, format: Modern.description, playerlimit: Modern.playerlimit},
      {name: Pauper.name, description: magicDescription, format: Pauper.description, playerlimit: Pauper.playerlimit},
      {name: PauperEDH.name, description: magicDescription, format: PauperEDH.description, playerlimit: PauperEDH.playerlimit}

    ], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Games', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
