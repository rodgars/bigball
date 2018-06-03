var express = require('express');
var StagesController = require('../controllers/stage');
var stages = require('../misc/stages');

var router = express.Router();
var stagesController = new StagesController();

router.get('/', (req, res) => {
	stagesController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.delete('/', (req, res) => {
	
	stagesController.deleteAll(function(message){

		res.json(message);

	});

});

router.put('/:stageId', (req, res) => {

	var stageJson = req.body;
	var stageId = req.params.stageId;

	console.log(stageId);

	stagesController.update(stageId, stageJson, function(docs){
	
		res.json(docs);
	});
});

router.post('/', (req, res) => {
	
	var stageJson = req.body;

	stagesController.create(stageJson, function(docs){
	
		res.json(docs);
	});
});

module.exports = router;
