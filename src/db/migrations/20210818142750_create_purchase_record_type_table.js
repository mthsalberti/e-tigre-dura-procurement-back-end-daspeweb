let {purchase_record_type} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(purchase_record_type, table => {
        dbHelper.generateDefaultFields(knex, table)
        table.string('description')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(purchase_record_type)
};
