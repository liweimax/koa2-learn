const mysql = require('mysql')

var pool = mysql.createPool({
  host:'127.0.0.1',
  user: 'root',
  password:'liweima',
  database: 'liweidb'
});


let asyncQuery = function( sql, values ) {
  return new Promise(( resolve, reject ) => {

    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { asyncQuery }