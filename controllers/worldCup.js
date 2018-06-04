var WorldCup = require('../models/WorldCup');

module.exports = function(){

	this.getAll = function(callback){

		WorldCup.find(function(err, worldCups){
			if(err) console.log(err);

			callback(worldCups);

		}).
		populate('stages.matches');
		/*populate('stages.matches.visitorTeam').
		populate('stages.matches.winner').
		populate('stages.matches.goals.player').
		populate('stages.matches.goals.team');*/

	};

	this.delete = function(wcId, callback){

		WorldCup.findByIdAndRemove(wcId, function(err){
			if(err) console.log(err);
			callback(true);
		});
		
	};

	this.update = function(wcId, wcJson, callback){

		var wc = WorldCup({
			_id: wcJson._id
		});

		for(var index in wcJson.stages){
			wc.stages.push(wcJson.stages[index]);
		}

		WorldCup.replaceOne({_id: wcId}, wc, function(err, doc){
			if(err) console.log(err);
			callback(doc);
		});
	
	};

	this.create = function(wcJson, callback){

		var wc = new WorldCup({
			_id: wcJson._id
		});

		for(var index in wcJson.stages){
			wc.stages.push(wcJson.stages[index]);
		}

		wc.save(function(err, doc){
			if(err) console.log(err);
			callback(doc);
		});
	
	}
};
