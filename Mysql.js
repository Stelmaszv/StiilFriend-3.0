var mysql = require('mysql');

var DBConnect= function RunDB(){
    
   const db = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "StilFriend 3.0"
  });
  db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("connected");
   })
  return db;
}

module.exports=DBConnect;