const mariadb = require('mariadb')
const config = require('./config');
const pool = mariadb.createPool(config.dbconfig)

pool.getConnection()
    .then(async (con) => {
        let result = await con.query('select 1 as  val')
        if (result) {
            console.log('db is connected')
        }
        else {
            console.log('connection error')
        }
    })
    .catch(err => {
        console.log('dbError:', err);
    })

module.exports = pool