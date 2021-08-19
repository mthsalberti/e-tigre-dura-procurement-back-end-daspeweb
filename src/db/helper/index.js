let {user} = require('../../config/tables')
require('dotenv').config()

module.exports = {
    generateDefaultFields: (knex, table) => {
        if (process.env.NODE_ENV === 'development') {
            table.increments('id').primary()
            module.exports.foreignFromId(table, 'createdBy', user)
            module.exports.foreignFromId(table, 'updatedBy', user)
        }

        table.timestamps()
        table.boolean('active').notNullable().defaultTo(true)
    },
    foreignFromId(baseTable, column, inTable) {
        if (process.env.NODE_ENV === 'development') {
            baseTable.integer(column).unsigned()
            baseTable.foreign(column).references('id').inTable(inTable)
        }
    }
}