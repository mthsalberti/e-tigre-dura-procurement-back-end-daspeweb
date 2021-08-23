let {approval, user} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(approval, table => {

        
        table.string('record_id')
        table.string('resource_name')
        table.string('status')
        table.string('reason')
        table.datetime('resolved_at')

        dbHelper.foreignFromId(table, 'resolved_by', user)

        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(approval)
};
