const {vendor} = require('../../config/tables')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex(vendor).del()
    .then(function () {
      // Inserts seed entries
      return knex(vendor).insert([
        {id: 1, name: 'BMW', phone: '8888 8888', email: 'bmw@bmw.com'},
        {id: 2, name: 'VW', phone: '8888 8888', email: 'vw@vw.com'},
        {id: 3, name: 'AUDI', phone: '8888 8888', email: 'audi@audi.com'},
        {id: 4, name: 'Ferrari', phone: '8888 8888', email: 'ferrari@ferrari.com'},
      ]);
    });
};
