const { responseCross, getFetchParams } = require('./utils')
//const { TigreError } = require('../class/TigreError')
const debug = require('debug')('middleware')
var db = db || require('./../config/db')
//const { getMessage } = require('../messages')

const error = (error) => {
//     let statusCode, body
//     if (error instanceof TigreError) {
//         statusCode = 400
//         body = {
//             ...error,
//             message: error.message
//         }
//     } else {
//         console.log(error)
//         statusCode = 500
//         body = {
//             ...getMessage('error.internalError'),
//             stack: error.code
//         }
//     }
//     return responseCross({
//         statusCode,
//         body: JSON.stringify(body)
//     })
 }

const success = (response) => {
    return responseCross({ 
        statusCode: 200, 
        body: JSON.stringify(response) 
    })
}

const isWarming = (event) => {
    return event.source === 'serverless-plugin-warmup'
}

const middleware = (event, context, next) => {
    if (isWarming(event)) return responseCross({})
    context.callbackWaitsForEmptyEventLoop = false
    debug('event: %o', event)
    debug('context: %o', context)
    context.fetchParams = (config = {}) => {
        return getFetchParams(event, config)
    }
    context.db = db
    // TODO - Aqui pode ser implementado o método de transactions
    return next(event, context, error, success)
}

module.exports = {
    middleware
}