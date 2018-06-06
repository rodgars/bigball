var express = require('express');
var MatchController = require('../controllers/match');

var router = express.Router();
var matchController = new MatchController();

router.get('/', (req, res) => {
	matchController.get(function(docs){
		
		res.json(docs);
	});
});


router.delete('/', (req, res) => {
	
	matchController.delete({}, function(message){

		res.json(message);

	});

});

router.put('/', (req, res) => {

	var matches = req.body;
		
	matchController.update(matches, function(docs){
	
		res.json(docs);
	});
	
});


module.exports = router;
