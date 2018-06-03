var express = require('express');
var WorldCupController = require('../controllers/worldCup');

var router = express.Router();
var worldCupController = new WorldCupController();

router.get('/', (req, res) => {

	worldCupController.getAll(function(docs){
		
		res.json(docs);
	});

});

router.delete('/:wcId', (req, res) => {
	
	var wcId = req.params.wcId;

	worldCupController.delete(wcId, function(message){

		res.json(message);

	});

});

router.put('/:wcId', (req, res) => {

	var wcJson = req.body;
	var wcId = req.params.wcId;

	worldCupController.update(wcId, wcJson, function(docs){
	
		res.json(docs);
	});
});

router.post('/', (req, res) => {
	
	var stageJson = req.body;

	worldCupController.create(stageJson, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
