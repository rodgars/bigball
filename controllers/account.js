var Account = require('../models/Account');

module.exports = function(){

	this.getById = function(id, callback){

		Account.findById(id, function(err, accounts){

			if(err) console.log(err);

			callback(accounts);

		});
	};

	this.getAll = function(callback){

		Account.find(function(err, accounts){

			if(err) console.log(err);

			callback(accounts);

		});
	};

	this.save = function(accountJson, callback) {	

		var account = new Account(accountJson);

		account.save(function(err, docs){
			if(err) console.log(err);

			callback(docs);
		});
	};

	this.update = function(accountId, accountJson, callback) {

		Account.findByIdAndUpdate(accountId, accountJson, {upsert: true}, function(err){
			if(err) callback(false);

			callback(true);
		});
	};

	this.delete = function(accountId, callback){
		Account.findByIdAndRemove(accountId, function(err){
			if(err) console.log(err);

			callback(true);
			
		});
		
	};

};
