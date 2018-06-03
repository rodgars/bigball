var Stage = require('../models/Stage');

module.exports = function(){

	this.getAll = function(callback){

		Stage.find(function(err, stages){
			if(err) console.log(err);

			callback(stages);

		}).
		populate('matches.homeTeam').
		populate('matches.visitorTeam').
		populate('matches.winner').
		populate('matches.goals.player').
		populate('matches.goals.team');

	};

	this.deleteAll = function(callback){

		Stage.collection.drop(function(err){
			if(err) console.log(err);
			callback(true);
		});
		
	};

	this.update = function(stageId, stageJson, callback){

		var newStage = Stage({
			_id: stageJson._id,
			deadline: stageJson.deadline
		});

		for(var index in stageJson.matches){
			newStage.matches.push(stageJson.matches[index]);
		}

		Stage.replaceOne({_id: stageId}, newStage, function(err, stage){
			if(err) console.log(err);
			callback(stage);
		});
	
	};

	this.create = function(stageJson, callback){

		console.log(stageJson._id);

		var newStage = new Stage({
			_id: stageJson._id,
			deadline: stageJson.deadline
		});

		for(var index in stageJson.matches){
			newStage.matches.push(stageJson.matches[index]);
		}

		newStage.save(function(err, stage){
			if(err) console.log(err);
			callback(stage);
		});
	
	}

	this.saveAll = function(stagesJson, callback) {

		var stages = stagesJson.map(function(s){

			var newStage = new Stage({
				_id: s._id,
				deadline: s.deadline
			});

			for(var index in s.matches){
				newStage.matches.push(s.matches[index]);
			}

			return newStage;
		});

		Stage.insertMany(stages, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});

	};
};
