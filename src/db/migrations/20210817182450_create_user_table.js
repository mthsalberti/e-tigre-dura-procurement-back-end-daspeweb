const dbHelper = require('../helper/index')
const {user} = require('../../config/tables')

exports.up = function (knex) {
    return knex.schema.createTable(user, table => {
        
        table.string('name')
        table.string('email')
        table.string('profile')
        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable(user)
};
