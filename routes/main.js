var express = require('express');
var teamRoutes = require('./team');
var stageRoutes = require('./stage');
var playerRoutes = require('./player');

module.exports = function(app) {

	app.use('/api/team', teamRoutes);

	app.use('/api/stage', stageRoutes);

	app.use('/api/player', playerRoutes);

}
