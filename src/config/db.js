require('dotenv').config()

const config = require('../../knexfile')
console.log('config:', config)
console.log('process.env:', process.env.NODE_ENV)
const knex = require('knex')(config[process.env.NODE_ENV])
module.exports = knex