const Guess = require('../models/Guess');
const Ranking = require('../models/Ranking');

module.exports = function(){

	this.get = function(filter, callback){

		Ranking.find(filter).populate('user').then(function(docs){

			docs.sort(function(a, b){return b.total-a.total});

			var result = [];

			docs.reduce(function(state, _next){
				var next = _next.toObject();

				if(state.points > next.total){
					next.position = ++state.position;
					state.points = next.points;
				} else {
					next.position = state.position;
				}
				result.push(next);

				return state;
			}, {position: 1, points: docs[0].total});

			callback(result);
		});
	};
};
