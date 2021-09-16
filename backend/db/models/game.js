'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    format: DataTypes.TEXT,
    playerlimit: DataTypes.INTEGER
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.hasMany(models.Event, {foreignKey:"gameId", onDelete: 'cascade', hooks:true})
  };
  return Game;
};