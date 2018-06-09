var express = require('express');
var StageGuessController = require('../controllers/stageGuess');

var router = express.Router();
var stageGuessController = new StageGuessController();

router.get('/', (req, res) => {

	var filter = {};

	stageGuessController.get(filter, function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	var filter = {};

	stageGuessController.delete(filter, function(message){

		res.json(message);

	});

});

router.put(/([a-f0-9]{24})/, (req, res) => {

	var stageGuess = req.body;

	if (!stageGuess._id) {res.json('ID nao encontrado.');}

	else if (stageGuess._id != req.params[0]) {res.json('ID do form diferente do ID da URL.');}

	else {
		
		stageGuessController.save(stageGuess, function(docs){
	
			res.json(docs[0]);
		});
	}
});

router.put('/', (req, res) => {

	var stageGuess = req.body;

	if (!stageGuess._id) {res.json('ID nao encontrado');}
	else {
		
		stageGuessController.save(stageGuess, function(docs){
	
			res.json(docs);
		});
	}
});

router.post('/', (req, res) => {

	var stageGuess = req.body;
		
	stageGuessController.save(stageGuess, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
