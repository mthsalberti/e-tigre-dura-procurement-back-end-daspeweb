let {purchase, purchase_item, department} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(purchase_item, table => {
        table.integer('quantity')
        table.string('description')
        table.decimal('unit_cost', 15, 2)
        table.decimal('total_cost', 15, 2)
        table.string('unit_of_measurement')

        // foreign
        dbHelper.foreignFromId(table, 'purchase_id', purchase)
        dbHelper.foreignFromId(table, 'department_id', department)

        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(purchase_item)
};
