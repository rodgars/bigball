var express = require('express');
var RankingController = require('../controllers/ranking');

var router = express.Router();
var rankingController = new RankingController();

router.get('/', (req, res) => {

	var filter = {};

	rankingController.get(filter, function(docs){
		
		res.json(docs);
	});
});

module.exports = router;
