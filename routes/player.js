var express = require('express');
var PlayersController = require('../controllers/player');
var teams = require('../misc/players');

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

module.exports = router;
