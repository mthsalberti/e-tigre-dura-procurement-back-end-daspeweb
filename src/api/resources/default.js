let knex = require('../../config/db')

/*
* TODO
*  Where builder to all requests
* CRUD -
*   CREATE -> PUT,
*   READ -> GET,
*   UPDATE -> PUT AND POST,
*   DELETE -> DELETE
* */

module.exports = {
    ALL: async (req, res, next) => {
        try {
            const {method, body} = req
            res.json(await module.exports[method](req))
        } catch (e) {
            console.log('ERROR:', e)
            res.json({
                error_message: 'Houve algum erro desconhecido...',
                error_description: e
            })
        }
    },
    GET: async (req) => {
        const {table, id} = req.params
        return knex(table).where(builder => id ? builder.where('id', id) : null)
    },
    POST: async (req) => {
        const {table} = req.params
        const {body} = req
        return knex(table).update(body)
    },
    PUT: async (req) => {
        const {table, keys} = req.params
        const {body} = req
        return knex.insert(body).into(table).onConflict(keys ?? ['id']).merge()
    },
    DELETE: async (req) => {
        const {table, id} = req.params
        return knex(table).where(builder => {
            if (id) return builder.where('id', id)
            else return null
        }).del()
    }
}
console.log(knex('user'))