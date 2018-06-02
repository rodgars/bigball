var express = require('express');
var teamRoutes = require('./team');
var matchRoutes = require('./match');

module.exports = function(app) {

	app.get('/api/bolao', function(req, res) {
		res.json({teste: 1});
	});

	app.use('/api/teams', teamRoutes);

	app.use('/api/match', matchRoutes);

}
