var express = require('express');
var PlayersController = require('../controllers/player');

var router = express.Router();
var playersController = new PlayersController();

router.get('/', (req, res) => {
	playersController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.delete('/', (req, res) => {
	
	playersController.deleteAll(function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var teams = req.body;

	playersController.deleteAll(function(docs){
		
		playersController.save(teams, function(docs){
		
			res.json(docs);
		});
	});

	
});

module.exports = router;
