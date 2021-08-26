const {middleware} = require('../../helpers/middleware')

exports.deletePurchaseById = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let {id} = event.pathParameters;
        await context.db('purchase_item').where('purchase_id', id).del()
        let data = await context.db('purchase').where('id', id).del()
        return success({data})
    } catch (e) {
        return error(e)
    }
});