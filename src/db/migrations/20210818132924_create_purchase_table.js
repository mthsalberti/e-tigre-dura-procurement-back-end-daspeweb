let {purchase, vendor, purchase_status, user, department} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(purchase, table => {
        table.string('ship_by')
        table.date('delivery_forecast')
        table.decimal('total_cost', 15, 2)

        // foreigners
        dbHelper.foreignFromId(table, 'vendor_id', vendor)
        dbHelper.foreignFromId(table, 'status_id', purchase_status)
        dbHelper.foreignFromId(table, 'requested_by', user)
        dbHelper.foreignFromId(table, 'requested_by_department', department)
        dbHelper.foreignFromId(table, 'designated_receiver_id', user)
        dbHelper.foreignFromId(table, 'created_by_department', department)
        dbHelper.foreignFromId(table, 'parent_id', purchase)

        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(purchase)
};
