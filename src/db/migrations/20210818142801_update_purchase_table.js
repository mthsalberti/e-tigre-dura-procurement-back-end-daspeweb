let {purchase, purchase_record_type} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.table(purchase, table => {
        dbHelper.foreignFromId(table, 'record_type_id', purchase_record_type)
    })
};

exports.down = function (knex) {
    return knex.schema.table(purchase, table => {
        table.dropForeign('record_type_id')
        table.dropColumn('record_type_id')
    })
};
