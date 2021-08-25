const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.insert = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let { table } = event.pathParameters;
        console.log('table', table)
        let body =  JSON.parse(event.body)
        const [id] = await context.db(table).insert(body)
        return success(await context.db(table).where('id', id))
    } catch (e) {
        console.log(e)
        return error(e)
    }
});    