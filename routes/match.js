var express = require('express');
var router = express.Router();
var MatchesController = require('../controllers/match');
var matchesController = new MatchesController();

router.get('/insert', (req, res) => {

var matches= [
{ "number":  1, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  2, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  3, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  4, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  5, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  6, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  7, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  8, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  9, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 10, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 11, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 12, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 13, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 14, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 15, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 16, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 17, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 18, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 19, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 20, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 21, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 22, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 23, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 24, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 25, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 26, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 27, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 28, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 29, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 30, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 31, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 32, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 33, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 34, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 35, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 36, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 37, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 38, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 39, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 40, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 41, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 42, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 43, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},

{ "number": 44, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 45, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 46, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 47, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 48, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"}
];

	matchesController.saveAll(matches, function(docs){
		
		res.json(docs);
	});
});

module.exports = router;


/*
var matches= [
{ "number":  1, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  2, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  3, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  4, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  5, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  6, "group": "A", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  7, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  8, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number":  9, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 10, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 11, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 12, "group": "B", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 13, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 14, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 15, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 16, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 17, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 18, "group": "C", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 19, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 20, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 21, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 22, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 23, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 24, "group": "D", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 25, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 26, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 27, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 28, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 29, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 30, "group": "E", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 31, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 32, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 33, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 34, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 35, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 36, "group": "F", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 37, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 38, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 39, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 40, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 41, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 42, "group": "G", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 43, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 44, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 45, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 46, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 47, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"},
{ "number": 48, "group": "H", "date": "2018-06-14", "homeTeam": "Rússia", "visitorTeam": "Arábia Saudita", "goals": [], "winner": "Rússia"}
]
*/
