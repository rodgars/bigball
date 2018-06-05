var express = require('express');
var StageController = require('../controllers/stage');

var router = express.Router();
var stageController = new StageController();

router.get('/', (req, res) => {
	stageController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.get('/:id', (req, res) => {

	var id = req.params.id;

	stageController.getById(id, function(docs){
		
		res.json(docs);
	});
});


router.delete('/:id', (req, res) => {
	
	var id = req.params.id;

	stageController.delete(id, function(doc){

		res.json(doc);

	});

});

router.put('/:id', (req, res) => {

	var id = req.params.id;
	var stage = req.body;

	stageController.update(id, stage, function(doc){

		res.json(doc);

	});
});

router.post('/', (req, res) => {

	var stage = req.body;

	if(Array.isArray(stage)){
		stageController.saveAll(stage, function(doc){

			res.json(doc);

		});
	} else {

		var id = stage._id;

		stageController.update(id, stage, function(doc){

			res.json(doc);

		});
	}
});


module.exports = router;

