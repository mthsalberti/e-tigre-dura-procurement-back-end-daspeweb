const {middleware} = require('../../helpers/middleware')

exports.id = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {
        let {table, id} = event.pathParameters;
        let data = await context.db(table).where('id', id).del()
        return success({data})
        /*//Add verificação pra não deletera dados bases...remover após teste
        if (id > 3) {
            let data = await context.db(table).where('id', id).del()
            return success({data})
        } else {
            return {
                body: JSON.stringify(
                    {
                        //Add verificação pra não deletera dados bases...remover após teste
                        message: 'Informe um id maior que 4'
                    },
                    null,
                    2
                ),
            };
        }*/
    } catch (e) {
        return error(e)
    }
});