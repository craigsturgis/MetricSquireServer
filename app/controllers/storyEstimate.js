'use strict';

var express = require('express'),
  router = express.Router(),
  db = require('../models'),
  _ = require('lodash'),
  Promise = require('bluebird');

module.exports = function (app) {
  app.use('/storyestimates', router);
};

router.param('cardId', function (req, res, next, id) {
  db.StoryEstimate.findAll({ where: { trelloCardShortLink: id } }).then(function(cardVotes) {
    req.shortLink = id;
    req.cardVotes = cardVotes || [];
    next();
  });
});

router.get('/:cardId', function (req, res, next) {

  res.jsonp({ cardVotes: req.cardVotes });

});

router.put('/:cardId', function (req, res, next) {

  var vote = _.pick(req.body, [
    'trelloMemberId',
    'trelloMemberFullName',
    'votePoints',
    'voteOtherVal'
  ]);


  if (!vote.trelloMemberId) {
    return res.status(400).jsonp({
      error: 'no trello member id sent!'
    });
  }

  db.StoryEstimate.findOrCreate({
    where: {
      trelloCardShortLink: req.shortLink,
      trelloMemberId: vote.trelloMemberId
    },
    defaults: vote,

  }).bind({}).spread(function(cardVote, created) {

    this.created = created;

    return (function () {
      if (created) {
        return Promise.resolve(cardVote);
      }

      _.assign(cardVote, vote);

      return cardVote.save();
    })();
  }).then(function(cardVote) {

    var status = this.created ? 201 : 200;

    res.status(status).jsonp(cardVote.get({
      plain: true
    }));
  });

});
