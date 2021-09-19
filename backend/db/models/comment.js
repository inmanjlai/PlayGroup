'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId" })
    Comment.belongsTo(models.Group, { foreignKey: "groupId" })
  };
  return Comment;
};