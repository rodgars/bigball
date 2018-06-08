var express = require('express');
var GuessController = require('../controllers/guess');

var router = express.Router();
var guessController = new GuessController();

router.put('/', (req, res) => {

	//var userId = req.user._id;
	var userId = '5b1428ddb6c9a940a5003e55';
	var matchGuess = req.body;
	var stageId = matchGuess.stageId;
	
	console.log(userId + ' ' + stageId + ' ' + matchGuess);

	guessController.saveMatchGuess(userId, stageId, matchGuess, function(docs){
		
		res.json(docs);
	});
});

module.exports = router;
