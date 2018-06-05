var express = require('express');
var WorldCupController = require('../controllers/worldCup');

var router = express.Router();
var worldCupController = new WorldCupController();

router.post('/clear', (req, res) => {
	
	worldCupController.clear(function(doc){

		res.json(doc);

	});

});

router.post('/seed', (req, res) => {

	worldCupController.seed(function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
