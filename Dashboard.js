var GetDashboard = function GetDashboard(){
    DashboardMigration();
    Routs()
    function Routs(){
        app.get('/GetDashBord/:ID', function(req, res){
            let Dashboard =`SELECT * FROM Dashboard inner join users on users.UserID = dashboard.IdSendContnet  `;
            db.query(Dashboard,function(err, result, field){ 
                res.send(result)
            })
        });
    }
    function DashboardMigration(){
        let dashboard ='CREATE  TABLE IF NOT EXISTS dashboard (iddashboard int NOT NULL AUTO_INCREMENT,PRIMARY KEY (`iddashboard`),type varchar(20) NOT NULL,Contnet text COLLATE utf8_polish_ci NOT NULL,IdSendContnet int,CreateTime datetime)';
        db.query(dashboard);
    }
}
module.exports=GetDashboard;