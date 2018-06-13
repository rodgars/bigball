var express = require('express');
var RankingController = require('../controllers/ranking');

var router = express.Router();
var rankingController = new RankingController();

router.get('/', (req, res) => {

	var id = req.query.id;
	var user = req.query.user;

	var filter = {};
	if(id) filter._id = id;
	if(user) filter.user = user;

	rankingController.get(filter, function(docs){
		
		res.json(docs);
	});
});

module.exports = router;
