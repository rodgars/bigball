var Stage = require('../models/Stage');

module.exports = function(){

	this.get = function(filter, callback){

		Stage.find(filter, function(err, docs){

			if(err) console.log(err);

			callback(docs);

		}).populate('matches');
	};

	this.getSituations = function(callback){

		callback(Stage.schema.path('situation').enumValues);
	};

	this.getStatus = function(callback){

		callback(Stage.schema.path('status').enumValues);
	};

	this.save = function(object, callback) {

		var stages = [];

		if(Array.isArray(object)) {stages = object} else {stages.push(object)}

		var promises = stages.map(function(stage){
			return Stage.asyncUpsert(stage._id, stage);
		});

		Promise.all(promises).then(doc => callback(doc)).catch(err => callback(err));
	};

	this.delete = function(id, callback){

		Stage.findByIdAndRemove(id, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
		
	};

};
