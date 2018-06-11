var Match = require('./Match');
var mongoose = require("mongoose");
var { Schema } = mongoose;

var teamSchema = new Schema({
	_id: String,
	name:  String,
	gp: Number,
	gc: Number
}, { versionKey: false });

teamSchema.methods.calculate =  function() {
	var instance = this;
	return new Promise(function(resolve, reject){

		Match.find({$or:[{homeTeam: instance._id}, {visitorTeam: instance._id}], homeScore: {$exists: true}, visitorScore: {$exists: true}}).then(function(matches){
			var golsPro = 0;
			var golsContra = 0;
			if (matches.length > 0) {

				matches.forEach(function(match){
					if(match.homeTeam == instance._id){
						golsPro = golsPro + match.homeScore;
						golsContra = golsContra+ match.visitorScore;
					} else {
						golsPro = golsPro + match.visitorScore;
						golsContra = golsContra+ match.homeScore;
					}
				});
			}

			instance.gp = golsPro;
			instance.gc = golsContra;
			instance.save(resolve);
		});
	});
	
};

module.exports = mongoose.model('Team', teamSchema);
