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

	if (!globalGuess._id) {res.json('ID nao encontrado');}
	else {
		
		globalGuessController.save(globalGuess, function(docs){
	
			res.json(docs);
		});
	}
});

router.put(/([a-f0-9]{24})/, (req, res) => {

	var globalGuess = req.body;

	if (!globalGuess._id) {res.json('ID nao encontrado.');}

	else if (globalGuess._id != req.params[0]) {res.json('ID do form diferente do ID da URL.');}

	else {
		
		globalGuessController.save(matchGuess, function(docs){
	
			res.json(docs[0]);
		});
	}
});

router.post('/', (req, res) => {

	var globalGuess = req.body;
		
	globalGuessController.save(globalGuess, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
