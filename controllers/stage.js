var Stage = require('../models/Stage');

module.exports = function(){

	this.getById = function(id, callback){

		Stage.findById(id, function(err, docs){

			if(err) console.log(err);

			callback(docs);

		}).populate('matches');
	};

	this.getAll = function(callback){

		Stage.find(function(err, docs){

			if(err) console.log(err);

			callback(docs);

		}).populate('matches');
	};

	this.update = function(id, json, callback) {	

		console.log(id);

		Stage.findByIdAndUpdate(id, json, {upsert: true}, function(err, docs){
			if(err) callback(false);

			callback(true);
		});
	};

	this.saveAll = function(json, callback) {

		Stage.insertMany(json, function(err, docs){
			if(err) callback(false);

			callback(true);
		});
	};

	this.delete = function(id, callback){

		Stage.findByIdAndRemove(id, function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
		
	};

};
