'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Event, { foreignKey: "locationId" })
  };
  return Location;
};