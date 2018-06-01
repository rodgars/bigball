var TeamsController = require('../controllers/teams');
var teamsController = new TeamsController();


module.exports = app => {
   app.get('/api/bolao', (req, res) => {

      var team = {name: "Brazil", flagLink: "link"};

      var testId = teamsController.save(team, function(doc){
         res.json(doc);
      });
   });
}
