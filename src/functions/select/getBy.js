const { tableNameUser, tableNameWorkCenter } = require('../../config/tables')
const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.id = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let { table, id } = event.pathParameters;
        if(id == null){
            let data = await context.db(table).limit(15);
            data = formatResultArray(data)
            return success({ data })
        }else{
            let data = await context.db(table).where('id', id);
            data = formatResultById(data)
            return success({ data })
        }
    } catch (e) {
        return error(e)
    }
});

exports.collection = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
       let { table, id } = event.pathParameters;
       if(id == null){
           let data = await context.db(table).limit(15);
           data = formatResultArray(data)
           return success({ data })
       }else{
           let data = await context.db(table).where('id', id);
           data = formatResultById(data)
           return success({ data })
       }
   } catch (e) {
       return error(e)
   }   
});

exports.condition = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let { table } = event.pathParameters;
        let condition = JSON.parse(Buffer.from((event.queryStringParameters['where'] ?? '[]'), 'base64').toString()); 
        
        let data = await context.db(table).where(builder => {
            condition.forEach(f => builder.where(f.field, f.operator, f.value))
            return builder
        })

        data = formatResultArray(data)
        return success({ data })

    } catch (e) {
        console.log(e)
            //return error(e)
    }
});    