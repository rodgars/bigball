var express = require('express');
var PlayersController = require('../controllers/player');

var router = express.Router();
var playersController = new PlayersController();

router.get('/', (req, res) => {
	playersController.get(function(docs){
		
		res.json(docs);
	});
});

router.delete('/', (req, res) => {
	
	playersController.delete({}, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var players = req.body;
		
	playersController.update(players, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
