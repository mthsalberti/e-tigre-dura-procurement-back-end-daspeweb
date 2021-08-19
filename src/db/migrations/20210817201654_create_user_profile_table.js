const dbHelper = require('../helper/index')
const {user_profile, user, profile} = require('../../config/tables')

exports.up = function (knex) {
    return knex.schema.createTable(user_profile, table => {
        dbHelper.generateDefaultFields(knex, table)

        dbHelper.foreignFromId(table, 'user_id', user)
        dbHelper.foreignFromId(table, 'profile_id', profile)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists(user_profile)
};
