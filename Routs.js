var Routs = function Routs(app){
    app.get('/', function(req, res){
        res.sendFile(__dirname + '/index.html');
    });
    app.get('/test', function(req, res){
        res.send('test') 
    });
}
module.exports=Routs;