const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.upsert = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {    
        let {table } = event.pathParameters;
        let body = JSON.parse(event.body)
        let data = await context.db(table).insert(body).onConflict('id').merge()
        // let data = await context.db(table).where('id');
        // data = formatResultById(data)
        return success({ data })
    } catch (e) {
        console.log('ERROR on upsert', e)
        return error(e)
    }
});    