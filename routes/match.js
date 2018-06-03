var express = require('express');
var MatchesController = require('../controllers/match');
var groupStageMatches = require('../misc/groupStageMatches');
var eighthFinalsMatches = require('../misc/eighthFinalsMatches');
var quarterFinalsMatches = require('../misc/quarterFinalsMatches');
var semiFinalsMatches = require('../misc/semiFinalsMatches');
var finalMatches = require('../misc/finalMatches');

var router = express.Router();
var matchesController = new MatchesController();

router.get('/', function(req, res){
	matchesController.getAll(function(matches){
		
		res.json(matches);
	});
});

router.get('/delete', (req, res) => {
	
	matchesController.deleteAll(function(message){

		res.json(message);

	});

});

router.get('/reset', function (req, res) {

	var matches = [].concat(groupStageMatches, eighthFinalsMatches, quarterFinalsMatches, semiFinalsMatches, finalMatches);

	matchesController.deleteAll(function(message){

		matchesController.saveAll(matches, function(docs){
		
			res.json(docs);
		});
	});
});

module.exports = router;
