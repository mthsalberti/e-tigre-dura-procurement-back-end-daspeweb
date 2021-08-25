const {tableNameUser, tableNameWorkCenter} = require('../../config/tables')
const {formatResultById, formatResultArray, related} = require('../../helpers/utils')
const {middleware} = require('../../helpers/middleware')

exports.id = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let {table, id} = event.pathParameters;
        if (id == null) {
            let data = await context.db(table).limit(15);
            data = formatResultArray(data)
            return success({data})
        } else {
            let buildBase64 = (json) => Buffer.from(JSON.stringify(json))
            let withToParse = event.queryStringParameters ? (event.queryStringParameters['with'] ?? buildBase64([])) : buildBase64([])
            let data = await context.db(table).where('id', id);
            let children = await Promise.all(JSON.parse(Buffer.from(withToParse, 'base64').toString()).map(c => {
                return new Promise(async  (resolve, reject) => {
                    try {
                        for (let i = 0; i < data.length; i++) {
                            data[i][c.alias] = await context.db(c.table).where(c.to, data[i][c.from])
                            if (c.column_merge && data[i][c.alias].length === 1) {
                                data[i][`${c.table}_${c.column_merge}`] = data[i][c.alias][0][c.column_merge]
                            }
                        }
                    }
                    catch (e) {
                        console.log("ERROR on get related", e)
                    }
                    finally {
                        resolve(data)
                    }
                })
            }))
            data = formatResultById(data)
            return success({data, children})
        }
    } catch (e) {
        return error(e)
    }
});

exports.collection = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let {table, id} = event.pathParameters;
        if (id == null) {
            let data = await context.db(table).limit(15);
            data = formatResultArray(data)
            return success({data})
        } else {
            let data = await context.db(table).where('id', id);
            data = formatResultById(data)
            return success({data})
        }
    } catch (e) {
        return error(e)
    }
});

exports.condition = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        // with [{table, from, to, alias, column_merge}]

        let buildBase64 = (json) => Buffer.from(JSON.stringify(json))
        let {table} = event.pathParameters;
        let whereToParse = event.queryStringParameters ? (event.queryStringParameters['where'] ?? buildBase64([])) : buildBase64([])
        let withToParse = event.queryStringParameters ? (event.queryStringParameters['with'] ?? buildBase64([])) : buildBase64([])

        let condition = JSON.parse(Buffer.from(whereToParse, 'base64').toString());
        let data = formatResultArray(await context.db(table)
            .where(builder => {
                if (condition !== []) {
                    condition.forEach(f => builder.where(f.field, f.operator, f.value))
                }
                return builder
            }))

        let children = await Promise.all(JSON.parse(Buffer.from(withToParse, 'base64').toString()).map(c => {
            return new Promise(async  (resolve, reject) => {
                try {
                    for (let i = 0; i < data.length; i++) {
                        data[i][c.alias] = await context.db(c.table).where(c.to, data[i][c.from])
                        if (c.column_merge && data[i][c.alias].length === 1) {
                            data[i][`${c.table}_${c.column_merge}`] = data[i][c.alias][0][c.column_merge]
                        }
                    }
                }
                catch (e) {
                    console.log("ERROR on get related", e)
                }
                finally {
                    resolve(data)
                }
            })
        }))

        return success({data, children})

    } catch (e) {
        console.log('error on get', e)
        return error(e)
    }
});