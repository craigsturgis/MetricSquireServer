'use strict';

module.exports = function (sequelize, DataTypes) {

  var StoryEstimate = sequelize.define('StoryEstimate', {
    trelloMemberId: DataTypes.STRING,
    trelloMemberFullName: DataTypes.STRING,
    trelloCardShortUrl: DataTypes.STRING,
    votePoints: DataTypes.INTEGER,
    voteOtherVal: DataTypes.STRING,
  }, {
    classMethods: {}
  });

  return StoryEstimate;
};