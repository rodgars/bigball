var Match = require('../models/Match');
var MatchGuess = require('../models/MatchGuess');
var StageGuess = require('../models/StageGuess');
var GlobalGuess = require('../models/GlobalGuess');
var Ranking = require('../models/Ranking');

module.exports = function(){

	this.get = function(filter, callback){

		Match.find(filter, function(err, matches){

			if(err) console.log(err);

			callback(matches);

		});
	};

	this.update = function(object, callback, recalculate = false) {

		var matches = [];

		if(Array.isArray(object)) {matches = object} else {matches.push(object)}

		var promises = matches.map(function(t){
			return new Promise(function(resolve, reject){

				Match.findByIdAndUpdate(t._id, t, {upsert: true, new: true}, function(err, doc){
					if(err) reject(err);
					resolve(doc);
				}).populate('homeTeam').populate('visitorTeam');
			});
		});

		Promise.all(promises).then(function(docs){
			if(recalculate){
				var promisses = [];
	
				docs.forEach(function(doc){
					// atualiza os match guess conforme resultado do match e o double match do stage parent se for o caso
					promisses.push(MatchGuess.calculate(doc));
					// atualiza GP e GC do time da casa
					promisses.push(doc.homeTeam.calculate());
					// atualiza GP e GC do time visitante
					promisses.push(doc.visitorTeam.calculate());
				});

				Promise.all(promisses).then(function(){
					// Calcula e atualiza a pontuacao da selacao GP, GC e topScore
					GlobalGuess.updateMatchGuessPoints().then(function(){
						// atualiza os stages com o total de pontos obtido com os jogos
						StageGuess.updateMatchGuessPoints().then(function(){
							// atualiza os rankings
							Ranking.updateRanking().then(callback(docs));
						});
					});
				});
			} else callback(docs);

		}).catch(doc => callback(doc));
	};

	this.delete = function(filter, callback){

		Match.remove(filter, function(err){

			if(err) callback(err);

			callback(true);
		});
		
	};

};
