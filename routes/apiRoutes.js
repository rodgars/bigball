module.exports = app => {
     app.get('/api/bolao', (req, res) => {
         res.send('{"teste": 1}');
     });
}
