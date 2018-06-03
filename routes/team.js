var express = require('express');
var TeamsController = require('../controllers/team');
var teams = require('../misc/teams');

var router = express.Router();
var teamsController = new TeamsController();

router.get('/', (req, res) => {
	teamsController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.get('/delete', (req, res) => {
	
	teamsController.deleteAll(function(message){

		res.json(message);

	});

});

router.get('/reset', (req, res) => {
	
	teamsController.deleteAll(function(message){

		teamsController.saveAll(teams, function(docs){
		
			res.json(docs);
		});

	});

});

module.exports = router;
