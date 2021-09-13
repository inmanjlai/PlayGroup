'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name:DataTypes.STRING,
    hostId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    locationId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsTo(models.User, { foreignKey:"hostId" })
    Event.belongsTo(models.Game, { foreignKey: "gameId" })
    Event.belongsTo(models.Location, { foreignKey: "locationId" })
    Event.hasMany(models.RSVP, { foreignKey: "eventId" })
  };
  return Event;
};