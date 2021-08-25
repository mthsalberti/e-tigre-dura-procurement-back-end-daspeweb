const responseCross = (response) => {
    return {
        ...response,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
    }
}
const formatActive = (value) => {
    return value === 1 ? true : false
}
const formatResultById = (value) => {
    if (value.length === 0) return {}
    let [result] = value
    if (result?.active !== undefined) {
        result.active = formatActive(result.active)
    }
    return result
}
const formatResultArray = (values) => {
    return values.map(value => {
        return formatResultById([value])
    })
}
const getFetchParams = (event, config) => {
    var qs = require('qs');
    let defaults = {
        page: undefined,
        limit: undefined,
        orderBy: "id",
        orderDirection: "ASC",
        filters: {}
    }

    defaults = {
        ...defaults,
        ...config
    }

    const params = qs.parse(event.queryStringParameters)

    const page = (params.page && parseInt(params.page)) || defaults.page
    const limit = (params.limit && parseInt(params.limit)) || defaults.limit
    const isPagination = page !== undefined && limit !== undefined
    const orderBy = params.orderBy || defaults.orderBy
    const orderDirection = params.orderDirection || defaults.orderDirection
    const filters = params.filters || defaults.filters

    return { page, limit, orderBy, orderDirection, isPagination, filters }
}
const related = async ({toRelated, data}) => {
    return Promise.all(toRelated.map(c => {
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
};

module.exports = {
    responseCross,
    getFetchParams,
    formatResultById,
    formatActive,
    formatResultArray,
    related
}