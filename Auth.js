var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')

var Auth = function Auth(app,db){
    app.use(bodyParser.json())
    this.app= app
    this.db=  db
    UserMigration();
    login();
    Register();
    LoginAvailable();
}
var login = function login(){
    app.post('/login', function(req, res){
        var loginErorrs ={
            EmptyData:  false,
            wrongpass:  false,
            ban:        false
        } 
        let sql = 'SELECT * FROM `users` WHERE `login` = "'+req.body[0].value+'"';
        db.query(sql, function (err, result, fields) {
                if(result[0]){
                    bcrypt.compare(req.body[1].value,result[0].password, function(err, passhas) {
                        if(passhas){
                            if(result[0].ban){
                                loginErorrs.ban=true;
                                res.send(loginErorrs)
                            }else{
                               res.send(jwt.sign({result}, 'shhhhh'));                     
                            }
                        }else{
                            loginErorrs.wrongpass=true;
                            res.send(loginErorrs)
                        }
                    });
                }else{
                   loginErorrs.wrongpass=true;
                   res.send(loginErorrs) 
                }
        });
    });
    
}
var Register = function Register(){
    const saltRounds = 10;
    app.post('/register',function(req,res){
        bcrypt.hash(req.body[1].value, saltRounds, function(err, hash) {
            let user={
                login:req.body[0].value,
                email:req.body[2].value,
                dateregister:req.body[3].value,
                lostlogin:req.body[3].value,
                password:hash,
                sex:req.body[4].value
            };
            let sql = 'INSERT INTO users SET ?'
            db.query(sql,user,function(err, result, field) {
                let sql = `SELECT * FROM users WHERE UserID = ${result.insertId}`;
                db.query(sql,function(err, result, field) {
                    res.send(jwt.sign({result}, 'shhhhh'));
                });
            });
        });
    })
}
var LoginAvailable = function LoginAvailable(){
    app.get('/LoginAvailable/:login',function(req,res){
        let sql = `SELECT * FROM users WHERE login = '${req.params.login}'`;
        db.query(sql,function(err, result, field) {
                res.send(result);
        });
    })
}
function UserMigration(){
  let sql = 'CREATE  TABLE IF NOT EXISTS users (UserID int(11) NOT NULL AUTO_INCREMENT,PRIMARY KEY (`UserID`),login varchar(255) COLLATE utf8_polish_ci NOT NULL,avatar VARCHAR(100) NOT NULL,email varchar(255) COLLATE utf8_polish_ci NOT NULL,password varchar(255) COLLATE utf8_polish_ci NOT NULL,ban tinyint(1) NOT NULL,active tinyint(1) NOT NULL,configure tinyint(1) NOT NULL,sex varchar(1) NOT NULL,dateregister datetime,lostlogin datetime )'
  db.query(sql);
}
module.exports=Auth;