var express = require('express');
var GuessController = require('../controllers/guess');

var router = express.Router();
var guessController = new GuessController();

router.get('/myGuess', (req, res) => {
	guessController.get(req.user, function(docs){
		
		res.json(docs);
	});
});

router.delete('/', (req, res) => {
	
	guessController.deleteAll(function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var guess = req.body;

	guessController.deleteAll(function(docs){
		
		guessController.save(guess, function(docs){
		
			res.json(docs);
		});
	});

	
});

module.exports = router;
