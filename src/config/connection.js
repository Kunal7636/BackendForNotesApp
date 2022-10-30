const mysql = require('mysql');
global.d = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');       
/*
  TODO-1: Settup Database connection
*/

    global.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'notesapp'
  });
  
  function connect(){
    // Validate request
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
    console.log('Connected to the MySQL server.');
    });
  }

  /*
    TODO-2: Upon database connection success, create the relavent table(s) if it does not exist.
  */
  function createTable(){
    var sql = "CREATE TABLE IF NOT EXISTS notes (id int primary key AUTO_INCREMENT, text VARCHAR(255), dateCreated VARCHAR(255),lastModified VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  }

module.exports = {connect,createTable};