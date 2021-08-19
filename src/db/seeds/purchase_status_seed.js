const {purchase_status} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(purchase_status).del()
    .then(function () {
      // Inserts seed entries
      return knex(purchase_status).insert([
        {id: 1, description: 'Draft'},
        {id: 2, description: 'To order'},
        {id: 3, description: 'To approval'},
        {id: 4, description: 'Approved'},
        {id: 5, description: 'To receive'},
        {id: 6, description: 'Receive'},
      ]);
    });
};
