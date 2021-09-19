'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const comments = [
      "Dude I can't wait to try out my new deck! Jesekai rules!",
      "Five color players are based",
      "Mannn there's an Ur Dragon player in this group, his deck is too strong! It's just five color good stuff!",
      "My Kozilek deck is strong but I think thopter tribal is too OP man",
      "Anyone have a Black Lotus for sale? I'm willing to pay like three cardboard pieces and half a chair",
      "Mill decks are the worst dude, you just gotta sit there and watch all your combo pieces hit the graveyard...",
      "I'm just excited to share this with the community, but I've been teaching my 57yo mom to play Magic! I learned to play it myself in 2019 (although I had been collecting the cards themselves since SOI). We've both been having a blast playing together and I'm genuinely surprised that she's so into it.",
      "Magic card art is awesome, I don't even play this game. I just collect the cards for the art!",
      "I don't care what anyone says but John Avon basic lands are the best lands to ever be printed",
      "Anyone ever heard of this card called Word of Command? It's insane! Too bad its like $2000. I'll never be able to afford it...",
      "Where does this group generally play? I can't see a location listed anywhere?",
      "Is anyone in this group against grouphug? I really enjoy the playstyle but I know some people don't like playing against it",
      "Whats the averge power level for decks in this group? I generally run a 7-8 but I can match lower power decks if needed.",
      "Is Pauper any fun? How can you enjoy the game using just common cards, doesn't make any sense.",
      "pEDH is the best format ever created dude, Mistmeadow Witch is an awesome general for a blink deck.",
      "So glad Golos got banned dude, most boring commander ever!",
      "I wish hullbreacher wasn't banned, my pirate tribal deck never wins anymore...",
      "So I had a single werewolf on my side of the battlefield, and my opponent had a skaab wrangler (tap 3 creatures you control to tap target creature) and a few other. I passed to combat and he used it to tap my werewolf, after which I cast howl of the hunt (flash enchantment that untapped my werewolf). I expected to be able to attack with it and win, but (on arena) it didn’t let me, as if the combat step had already passed. Is it just me or should I have been able to attack with it after the effects resolved?",
      "I wanna make standard Jeskai control deck but I don't know which mass removal should I craft. Which do you think is better? Doomskar or Vanquish the Horde"
    ]

    function generateComment() {
      let comment = {
        body: comments[getRandomInt(0, comments.length)],
        userId: getRandomInt(1, 11),
        groupId: getRandomInt(1, 4)
      };
      // console.log(comment)
      return comment;
    }

    function generateMultipleComments(num) {
      const commentsArr = [];
      for(let i = 0; i < num; i++) {
        commentsArr.push(generateComment())
      }
      return commentsArr;
    }

      return queryInterface.bulkInsert('Comments', 
        generateMultipleComments(25),
      {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Comments', null, {});

  }
};
