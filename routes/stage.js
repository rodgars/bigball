var express = require('express');
var StageController = require('../controllers/stage');

var router = express.Router();
var stageController = new StageController();

router.get('/', (req, res) => {

	var filter = {id: req.params.id};

	stageController.get(filter, function(docs){

		res.json(docs);
	});
});

router.get('/situation', (req, res) => {
	stageController.getSituations(function(docs){
		
		res.json(docs);
	});
});

router.get('/status', (req, res) => {
	stageController.getStatus(function(docs){
		
		res.json(docs);
	});
});

router.delete('/:id', (req, res) => {
	
	var id = req.params.id;

	stageController.delete(id, function(doc){

		res.json(doc);

	});

});

router.put('/', (req, res) => {

	var stage = req.body;
	
	stageController.save(stage, function(docs){

		res.json(docs);
	});

});


module.exports = router;

