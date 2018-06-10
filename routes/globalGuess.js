var express = require('express');
var GlobalGuessController = require('../controllers/globalGuess');

var router = express.Router();
var globalGuessController = new GlobalGuessController();

router.get('/', (req, res) => {

	var filter = {};

	globalGuessController.get(filter, function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	var filter = {};

	globalGuessController.delete(filter, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var globalGuess = req.body;
	
	globalGuessController.save(globalGuess, function(docs){

		res.json(docs);
	});
});

router.post('/', (req, res) => {

	var globalGuess = req.body;
		
	globalGuessController.save(globalGuess, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
