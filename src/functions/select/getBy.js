const {tableNameUser, tableNameWorkCenter} = require('../../config/tables')
const {formatResultById, formatResultArray, related} = require('../../helpers/utils')
const {middleware} = require('../../helpers/middleware')

exports.id = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let {table, id} = event.pathParameters;
        let data = await context.db.select('*')
            .from(table)
            .where('id', id)

        data = formatResultById(data)
        return success({data})
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
        console.log("whereToParse", JSON.parse(Buffer.from(whereToParse, 'base64').toString()))

        let condition = JSON.parse(Buffer.from(whereToParse, 'base64').toString());
        let data = formatResultArray(await context.db(table)
            .where(builder => {
                if (condition !== []) {
                    condition.forEach(f => builder.where(f.field, f.operator, f.value))
                }
                return builder
            }))

        return success({data})

    } catch (e) {
        console.log('error on get', e)
        return error(e)
    }
});

exports.purchaseFromStatus = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        // with [{table, from, to, alias, column_merge}]

        let buildBase64 = (json) => Buffer.from(JSON.stringify(json))
        let id = event.pathParameters?.id;
        let data;
        console.log('id', id)
        if (id !== undefined) {
            data = formatResultArray(await context.db.raw(`SELECT pc.* , 
\tDATE_FORMAT(pc.delivery_forecast , '%Y-%m-%d') as delivery_forecast, 
    v.name as vendor_name, 
    dp.description as department_description, 
    pcs.description as status_description , 
    department_requested_by.description as department_requested_by_description, 
    department_created_by.description as department_created_by_description,
    user_requested_by.name as requested_by_name, 
    user_created_by.name as created_by_name,
    user_designated_receiver.name as designated_receiver_name
FROM
\tvendor v, department dp, purchase_status pcs, purchase pc 
LEFT JOIN user as user_requested_by ON pc.requested_by = user_requested_by.id 
LEFT JOIN user as user_created_by ON pc.createdBy = user_created_by.id     
LEFT JOIN user as user_designated_receiver ON pc.designated_receiver_id = user_designated_receiver.id     
LEFT JOIN department as department_requested_by ON pc.requested_by_department = department_requested_by.id 
LEFT JOIN department as department_created_by ON pc.created_by_department = department_created_by.id 
WHERE pcs.id = pc.status_id 
\tAND pc.created_by_department = dp.id 
    AND pc.vendor_id = v.id AND pc.id = ${id}`))
        } else {
            // data = await context.db.raw(`SELECT pc.id ,v.name, dp.description, pcs.description  vendor v, department dp, purchase_status pcs, purchase pc  pcs.id = pc.status_id AND pc.created_by_department = dp.id AND pc.vendor_id = v.id `)
            data = await context.db.raw(`SELECT pc.id , pc.total_cost, v.name as vendor_name, dp.description as created_by_department_description, pcs.description as status_description FROM vendor v, department dp, purchase_status pcs, purchase pc WHERE pcs.id = pc.status_id AND pc.created_by_department = dp.id AND pc.vendor_id = v.id `)
        }


        return success(data)

    } catch (e) {
        console.log('error on get', e)
        return error(e)
    }
});

exports.purchaseItemsFromPurchaseId = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let id = event.pathParameters?.id;
        let data = await context
            .db.raw(`SELECT pi.*, dp.description as department_description FROM purchase_item as pi LEFT JOIN department as dp ON pi.department_id = dp.id WHERE purchase_id = ${id}`)
        return success(data)

    } catch (e) {
        console.log('error on get', e)
        return error(e)
    }
});