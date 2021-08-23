let {purchase, goods_receipt} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(goods_receipt, table => {

        
        table.string('invoice')
        dbHelper.foreignFromId(table, 'purchase_id', purchase)
        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(goods_receipt)
};
