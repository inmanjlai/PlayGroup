'use strict';
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Events', [

        {name: "Kamigawa Block Drafts ", hostId: 1, gameId: 1, date: faker.date.future().toDateString(), locationId: 1, image: "https://lh3.googleusercontent.com/proxy/pXLlR9HATcAB71PG6cqESgrVwHQdA9slV2scqMSM73zHbXpbuUImQpflGtmH7NQr8vbdsrkaXU9M-BW1OZ3vm4WQz7MhiIE" },
        {name: "Wednesday Night Modern", hostId: 2, gameId: 2, date: faker.date.future().toDateString(), locationId: 2, image: "https://yt3.ggpht.com/ytc/AKedOLRqO79YQNAF_PSRhH4SU9GkVa52ZWmrRSnFImwT=s900-c-k-c0x00ffffff-no-rj"},
        {name: "Friday Night Magic", hostId: 3, gameId: 3, date: faker.date.future().toDateString(), locationId: 3, image: "https://scontent.fdet1-2.fna.fbcdn.net/v/t31.18172-8/fr/cp0/e15/q65/11728805_958918794147905_6953677250504513002_o.jpg?_nc_cat=109&ccb=1-5&_nc_sid=05277f&efg=eyJpIjoidCJ9&_nc_ohc=RUH-0Q1oYSUAX9CwNyw&_nc_ht=scontent.fdet1-2.fna&oh=9b7ea9926fbb53f64aff8e584c281d63&oe=616697FF"},
        {name: "Magic Night with the bros!", hostId: 1, gameId: 4, date: faker.date.future().toDateString(), locationId: 6, image: "http://firesidegames.com/wp-content/uploads/2015/10/Something_Wicked_Gamers_Gambit_Storefront.jpg" },
        {name: "EDH and chill", hostId: 2, gameId: 5, date: faker.date.future().toDateString(), locationId: 7, image: "https://afar-production.imgix.net/uploads/images/post_images/images/faQBTuA2PT/original_open-uri20130925-14661-6f7dqu?1383826916?ixlib=rails-0.3.0&auto=format%2Ccompress&crop=entropy&fit=crop&h=719&q=80&w=954" },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Events', null, {truncate: true, cascade: true, restartIdentity: true});

  }
};
