const {user} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(user).del()
    .then(function () {
      // Inserts seed entries
      return knex(user).insert([
        {id: 1, name: 'Matheus Alberti', department_id: 1},
        {id: 2, name: 'Guilherme Reis', department_id: 2},
        {id: 3, name: 'Ana Romanichen', department_id: 2},
      ]);
    });
};
