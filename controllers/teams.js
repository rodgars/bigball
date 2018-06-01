var Team = require('../models/Team');

module.exports = function(){

   this.save = function(teamJson, callback){

	var team = teamJson;

        if(!team._id) team = new Team(team);
        
        Team.findByIdAndUpdate(team._id, team, {upsert: true, new: true}, function(err, doc){
            if(err) console.log(err);

            callback(doc);
        });
    };

};
