var express = require('express');
var teamRoutes = require('./team');
var worldCupRoutes = require('./worldCup');
var matchRoutes = require('./match');
var playerRoutes = require('./player');
var guessRoutes = require('./guess');
var accountRoutes = require('./account');
var stageRoutes = require('./stage');
var userRoutes = require('./user');
var matchGuessRoutes = require('./matchGuess');
var stageGuessRoutes = require('./stageGuess');
var globalGuessRoutes = require('./globalGuess');
var rankingRoutes = require('./ranking');
var requireLogin = require('../middlewares/requireLogin');

module.exports = function(app) {

	app.use('/api/team', teamRoutes);

	app.use('/api/worldCup', worldCupRoutes);

	app.use('/api/player', playerRoutes);

	app.use('/api/guess', requireLogin, guessRoutes);

	app.use('/api/match', matchRoutes);

	app.use('/api/account', accountRoutes);

	app.use('/api/stage', stageRoutes);

	app.use('/api/user', userRoutes);

	app.use('/api/matchGuess', matchGuessRoutes);

	app.use('/api/stageGuess', stageGuessRoutes);

	app.use('/api/globalGuess', globalGuessRoutes);

	app.use('/api/ranking', rankingRoutes);
}



