let {vendor} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(vendor, table => {

        
        table.string('name')
        table.string('phone')
        table.string('email')
        table.string('contact')
        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(vendor)
};
