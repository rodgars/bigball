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

router.get('/delete', (req, res) => {
	
	stagesController.deleteAll(function(message){

		res.json(message);

	});

});

router.get('/reset', (req, res) => {

	stagesController.deleteAll(function(msg){

		stagesController.saveAll(stages, function(docs){
		
			res.json(docs);
		});

	});

	
});

module.exports = router;
