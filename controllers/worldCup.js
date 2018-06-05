var WorldCup = require('../models/WorldCup');
var Match = require('../models/Match');

module.exports = function(){

	this.getAll = function(callback){

		WorldCup.find(function(err, worldCups){
			if(err) console.log(err);

			callback(worldCups);

		}).
		populate('stages.matches');

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

			var matches = wcJson.stages[index].matches;

			for(var mIndex in matches){

				var match = matches[mIndex];

				Match.update({_id: match._id}, match).exec();
			}

			wc.stages.push(wcJson.stages[index]);
			
		}

		WorldCup.update({_id: wcId}, wc, function(err, doc){
			if(err) console.log(err);
			callback(doc);
		});
	
	};

	this.create = function(wcJson, callback){

		var wc = new WorldCup({
			_id: wcJson._id
		});

		for(var index in wcJson.stages){

			var matches = wcJson.stages[index].matches;

			for(var mIndex in matches){

				var match = matches[mIndex];

				Match.update({_id: match._id}, match).exec();
			}

			wc.stages.push(wcJson.stages[index]);
			
		}

		wc.save(function(err, doc){
			if(err) console.log(err);
			callback(doc);
		});
	
	}
};
