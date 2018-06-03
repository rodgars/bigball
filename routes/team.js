var express = require('express');
var TeamsController = require('../controllers/team');

var router = express.Router();
var teamsController = new TeamsController();

router.get('/', (req, res) => {
	teamsController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.delete('/', (req, res) => {
	
	teamsController.deleteAll(function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var teams = req.body;

	teamsController.deleteAll(function(docs){
		
		teamsController.save(teams, function(docs){
		
			res.json(docs);
		});
	});

	
});


module.exports = router;
