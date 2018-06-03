var express = require('express');
var teamRoutes = require('./team');
var worldCupRoutes = require('./worldCup');
var playerRoutes = require('./player');

module.exports = function(app) {

	app.use('/api/team', teamRoutes);

	app.use('/api/worldCup', worldCupRoutes);

	app.use('/api/player', playerRoutes);

}
