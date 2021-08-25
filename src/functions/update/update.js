const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.change = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {    
        let {table, id } = event.pathParameters;
        let body =  JSON.parse(event.body)
        await context.db(table).update(body).where('id', id)
        let data = await context.db(table).where('id', id);
        data = formatResultById(data)
        return success({ data })
    } catch (e) {
        return error(e)
    }
});    