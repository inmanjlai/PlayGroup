'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    image:DataTypes.STRING,
    description: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER
  }, {});
  Group.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: "userGroup",
      foreignKey: "groupId",
      otherKey: "userId"
    }

    Group.belongsToMany(models.User, columnMapping)
    Group.hasMany(models.userGroup, {foreignKey: "groupId", hooks: true, onDelete: "CASCADE"})
    Group.hasMany(models.Comment, { foreignKey: "groupId" })
  };
  return Group;
};