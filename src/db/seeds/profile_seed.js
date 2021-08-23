const {profile} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(profile).del()
    .then(function () {
      // Inserts seed entries
      return knex(profile).insert([
        {id: 1, description: 'admin'},
        {id: 2, description: 'common'},
      ]);
    });
};
