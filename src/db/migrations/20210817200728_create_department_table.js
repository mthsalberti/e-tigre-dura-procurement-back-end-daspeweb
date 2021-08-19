const dbHelper = require('../helper/index')
const {department} = require('../../config/tables')

exports.up = function (knex) {
    return knex.schema.createTable(department, table => {
        
        table.string('description', 100)

        dbHelper.generateDefaultFields(knex, table)
    })

};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(department)
};
