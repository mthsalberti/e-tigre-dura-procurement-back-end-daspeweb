const dbHelper = require('../helper/index')
const {profile} = require('../../config/tables')

exports.up = function (knex) {
    return knex.schema.createTable(profile, table => {
        
        table.string('description')

        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(profile)
};
