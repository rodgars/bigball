var express = require('express');
var MatchController = require('../controllers/match');

var router = express.Router();
var matchController = new MatchController();

router.get('/', (req, res) => {

	var filter = {};

	if (req.query.id) filter._id = req.query.id;
	if (req.query.homeTeam) filter.homeTeam = req.query.homeTeam;
	if (req.query.visitorTeam) filter.visitorTeam = req.query.visitorTeam;

	matchController.get(filter, function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	matchController.delete({}, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var matches = req.body;
		
	matchController.update(matches, function(docs){
	
		res.json(docs);
	}, true);
	
});


module.exports = router;
