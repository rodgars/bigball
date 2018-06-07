var User = require('../models/User');

module.exports = function(){

	this.getById = function(id, callback){

		User.findById(id, function(err, accounts){

			if(err) console.log(err);

			callback(accounts);

		});
	};

	this.getAll = function(filter, callback){

		User.find(filter, function(err, accounts){

			if(err) console.log(err);

			callback(accounts);

		});
	};

	this.update = function(id, user, callback) {

		User.findByIdAndUpdate(id, user, {upsert: true}, function(err){
			if(err) callback(false);

			callback(true);
		});
	};
};
