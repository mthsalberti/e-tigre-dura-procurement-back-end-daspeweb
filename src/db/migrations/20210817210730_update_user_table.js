let dbHelper = require('../helper/index')
let {user, department} = require('../../config/tables')

exports.up = function (knex) {
    return knex.schema.table(user, table => {
        dbHelper.foreignFromId(table, 'department_id', department)
    })
};

exports.down = function (knex) {
    return knex.schema.table(user, table => {
        table.dropForeign('department_id')
        table.dropColumn('department_id')
    })
};
