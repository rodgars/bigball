var express = require('express');
var TopScorerController = require('../controllers/topScorer');

var router = express.Router();
var topScorerController = new TopScorerController();

router.get('/', (req, res) => {

	var filter = {};

	topScorerController.get(filter, function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	var filter = {};

	topScorerController.delete(filter, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var topScorer = req.body;
	
	topScorerController.save(topScorer, function(docs){

		res.json(docs);
	});
});

router.post('/', (req, res) => {

	var topScorer = req.body;
		
	topScorerController.save(topScorer, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
