var Match = require('../models/Match');

module.exports = function(){

	this.get = function(callback){

		Match.find(function(err, matches){

			if(err) console.log(err);

			callback(matches);

		});
	};

	this.update = function(object, callback) {

		var matches = [];

		if(Array.isArray(object)) {matches = object} else {matches.push(object)}

		var promises = matches.map(function(t){
			return new Promise(function(resolve, reject){

				Match.findByIdAndUpdate(t._id, t, {upsert: true, new: true}, function(err, doc){
					if(err) reject(err);
					resolve(doc);
				});
			});
		});

		Promise.all(promises).then(function(docs){

			Promise.all(docs.map(function(doc){
				return new Promise(function(resolve, reject){
					doc.calculate(resolve);
				});
				
			})).then(callback(docs));

		}).catch(doc => callback(doc));
	};

	this.delete = function(filter, callback){

		Match.remove(filter, function(err){

			if(err) callback(err);

			callback(true);
		});
		
	};

};
