var mysql = require('mysql');

var db_config = {
  host: 'localhost',
    user: 'backup',
    password : '',
    database : 'tecnoalerta'
};

var connection;

var connMySQL = function(){
  //console.log('Conexão com o banco de dados estabelecida')
  connection = mysql.createConnection(db_config); 

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });  

  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      connMySQL();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });

  return connection;
};

module.exports = function(){
  return connMySQL;
};