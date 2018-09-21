const knex = require('knex')
const keys = require('../config/keys')

//settting up the db connection
const db = knex({
    client: 'pg',
    connection: {
      host : keys.host,
      user : keys.user,
      password : keys.password,
      database : keys.database
    }
})

module.exports = db