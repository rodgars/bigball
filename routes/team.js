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

router.delete('', (req, res) => {
	
	teamsController.deleteAll(function(message){

		res.json(message);

	});

});


module.exports = router;
