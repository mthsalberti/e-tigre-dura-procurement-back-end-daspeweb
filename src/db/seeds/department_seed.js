const {department} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(department).del()
    .then(function () {
      // Inserts seed entries
      return knex(department).insert([
        {id: 1, description: 'IT'},
        {id: 2, description: 'Marketing'},
        {id: 3, description: 'Finance'},
        {id: 4, description: 'Administration'},
      ]);
    });
};
