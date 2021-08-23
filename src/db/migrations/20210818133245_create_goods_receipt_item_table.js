let {purchase_item, goods_receipt, goods_receipt_item} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(goods_receipt_item, table => {
        table.integer('quantity')

        // foreign
        dbHelper.foreignFromId(table, 'goods_receipt_id', goods_receipt)
        dbHelper.foreignFromId(table, 'purchase_item_id', purchase_item)

        dbHelper.generateDefaultFields(knex, table)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(goods_receipt_item)
};
