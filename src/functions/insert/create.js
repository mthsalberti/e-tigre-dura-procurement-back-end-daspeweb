const { tableNameUser, tableNameWorkCenter } = require('../../config/tables')
const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.insert = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let { table } = event.pathParameters;
        let body =  JSON.parse(event.body)
        let data = await context.db(table).insert(body)

        data = formatResultArray(data)

        return success({ data })

    } catch (e) {
        console.log(e)
            //return error(e)
    }
});    