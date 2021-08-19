let {approval, user, approval_user} = require('../../config/tables')
let dbHelper = require('../helper/index')

exports.up = function (knex) {
    return knex.schema.createTable(approval_user, table => {
        // foreign
        dbHelper.generateDefaultFields(knex, table)
        dbHelper.foreignFromId(table, 'approver_id', user)
        dbHelper.foreignFromId(table, 'approval_process_id', approval)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(approval_user)
};
