const {user_profile} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(user_profile).del()
    .then(function () {
      // Inserts seed entries
      return knex(user_profile).insert([
        {id: 1, user_id: 1, profile_id: 1},
        {id: 2, user_id: 2, profile_id: 1},
        {id: 3, user_id: 3, profile_id: 2},
      ]);
    });
};
