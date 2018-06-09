var Team = require('../models/Team');
var Player = require('../models/Player');
var Match = require('../models/Match');
var Stage = require('../models/Stage');
var Account = require('../models/Account');

var teams = require('../misc/Teams.json');
var players = require('../misc/Players.json');
var matches = require('../misc/Matches.json');
var stages = require('../misc/Stages.json');
var account = require('../misc/Account.json');

var TeamsController = require('../controllers/team');
var teamsController = new TeamsController();

var PlayersController = require('../controllers/player');
var playersController = new PlayersController();

var MatchController = require('../controllers/match');
var matchController = new MatchController();

var StageController = require('../controllers/stage');
var stageController = new StageController();

var AccountController = require('../controllers/account');
var accountController = new AccountController();

module.exports = function(){

	this.clear = function(callback){
		
		Stage.remove({}, function(err, doc){

			if(err) callback(err);
			Match.remove({}, function(err, doc){

				if(err) callback(err);
				Player.remove({}, function(err, doc){

					if(err) callback(err);
					Team.remove({}, function(err, doc){
						if(err) callback(err);
						
						Account.remove({}, function(err, doc){
							if(err) callback(err);
						
							callback(true);
						});
					});

				});

			});
		});
		
	};

	this.seed = function(callback){
		teamsController.update(teams, function(doc){

			playersController.update(players, function(doc){

				matchController.update(matches, function(doc){

					stageController.save(stages, function(doc){

						accountController.update(account._id, account, function(doc){

							callback(doc);
						});
					});
				});
			});
		});
	};
};
