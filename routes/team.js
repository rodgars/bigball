var express = require('express');
var router = express.Router();
var TeamsController = require('../controllers/team');
var teamsController = new TeamsController();

router.get('/', (req, res) => {
	teamsController.getAll(function(docs){
		
		res.json(docs);
	});
});

router.get('/insert', (req, res) => {

	var teams = [{name: "Rússia", flagCode: "flag-br"},
		{name: "Brasil", flagCode: "flag-br"},
		{name: "Irã", flagCode: "flag-br"},
		{name: "Coreia do Sul", flagCode: "flag-br"},
		{name: "Japão", flagCode: "flag-br"},
		{name: "Arábia Saudita", flagCode: "flag-br"},
		{name: "Austrália", flagCode: "flag-br"},
		{name: "Tunísia", flagCode: "flag-br"},
		{name: "Nigéria", flagCode: "flag-br"},
		{name: "Marrocos", flagCode: "flag-br"},
		{name: "Senegal", flagCode: "flag-br"},
		{name: "Egito", flagCode: "flag-br"},
		{name: "México", flagCode: "flag-br"},
		{name: "Costa Rica", flagCode: "flag-br"},
		{name: "Panamá", flagCode: "flag-br"},
		{name: "Uruguai", flagCode: "flag-br"},
		{name: "Argentina", flagCode: "flag-br"},
		{name: "Colômbia", flagCode: "flag-br"},
		{name: "Peru", flagCode: "flag-br"},
		{name: "França", flagCode: "flag-br"},
		{name: "Portugal", flagCode: "flag-br"},
		{name: "Alemanha", flagCode: "flag-br"},
		{name: "Sérvia", flagCode: "flag-br"},
		{name: "Polônia", flagCode: "flag-br"},
		{name: "Inglaterra", flagCode: "flag-br"},
		{name: "Espanha", flagCode: "flag-br"},
		{name: "Bélgica", flagCode: "flag-br"},
		{name: "Islândia", flagCode: "flag-br"},
		{name: "Suíça", flagCode: "flag-br"},
		{name: "Croácia", flagCode: "flag-br"},
		{name: "Suécia", flagCode: "flag-br"},
		{name: "Dinamarca", flagCode: "flag-br"}
	];

	teamsController.saveAll(teams, function(docs){
		
		res.json(docs);
	});
});

module.exports = router;
