var express = require('express');
var TeamsController = require('../controllers/team');

var router = express.Router();
var teamsController = new TeamsController();

router.get('/', (req, res) => {

	var filter = {};

	teamsController.get(filter, function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	var filter = {};

	teamsController.deleteAll(filter, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var teams = req.body;
		
	teamsController.update(teams, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
