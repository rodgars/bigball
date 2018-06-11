var express = require('express');
var MatchGuessController = require('../controllers/matchGuess');

var router = express.Router();
var matchGuessController = new MatchGuessController();

router.get('/', (req, res) => {

	var filter = {};

	if (req.query.id) filter = {_id: req.query.id};

	matchGuessController.get(filter, function(docs){
		
		res.json(docs);
	});
});

router.get(/([a-f0-9]{24})/, (req, res) => {

	var filter = {_id: req.params[0]};

	matchGuessController.get(filter, function(docs){
		
		res.json(docs[0]);
	});
});


router.delete('/', (req, res) => {
	
	var filter = {};

	matchGuessController.delete(filter, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var matchGuess = req.body;

	if(!matchGuess._id) {res.json('ID nao encontrado');}
	else {
		
		matchGuessController.save(matchGuess, function(docs){
	
			res.json(docs);
		});
	}
});

router.put(/([a-f0-9]{24})/, (req, res) => {

	var matchGuess = req.body;

	if (!matchGuess._id) {res.json('ID nao encontrado.');}

	else if (matchGuess._id != req.params[0]) {res.json('ID do form diferente do ID da URL.');}

	else {
		
		matchGuessController.save(matchGuess, function(docs){
	
			res.json(docs[0]);
		});
	}
});

router.post('/', (req, res) => {

	var matchGuess = req.body;
		
	matchGuessController.save(matchGuess, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
