const mysql = require('mysql')
const dbConfig = require('../dbConfig')

var pool = mysql.createPool(dbConfig);

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