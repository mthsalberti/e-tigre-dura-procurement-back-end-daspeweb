const { tableNameUser, tableNameWorkCenter } = require('../../config/tables')
const { formatResultById, formatResultArray } = require('../../helpers/utils')
const { middleware } = require('../../helpers/middleware')

exports.change = async (event, context) => middleware(event, context, async (event, context, error, success) => {
    try {    
      
    
        let {table, id } = event.pathParameters;
        let body =  JSON.parse(event.body)

        console.log("tes123");

        console.log("id");
        console.log(id);
    
               
        console.log("table");
        console.log(table);
    
               
        console.log("body");
        console.log(body);
        await context.db(table).where('id', id).update(body)

 
        data = formatResultArray(data)

    console.log("Data");
    console.log(data);

        return success({ data })

    } catch (e) {
        console.log(e)
            //return error(e)
    }
});    