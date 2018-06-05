var express = require('express');
var MatchController = require('../controllers/match');

var router = express.Router();
var matchController = new MatchController();

router.get('/', (req, res) => {
	matchController.getAll(function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	matchController.deleteAll(function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var matches = req.body;

	matchController.deleteAll(function(docs){
		
		matchController.save(matches, function(docs){
		
			res.json(docs);
		});
	});

	
});


module.exports = router;
