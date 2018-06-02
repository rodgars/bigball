var express = require('express');
var teamRoutes = require('./team');
var matchRoutes = require('./match');
var stageRoutes = require('./stage');

module.exports = function(app) {

	app.get('/api/bolao', function(req, res) {
		res.json({teste: 1});
	});

	app.use('/api/team', teamRoutes);

	app.use('/api/match', matchRoutes);

	app.use('/api/stage', stageRoutes);

}
