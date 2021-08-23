const { TigreError } = require('../class/TigreError')
const existsOrError = (value, message) => {
    if (typeof value === 'boolean') return
    if (typeof value === 'number') return
    if (!value) throw new TigreError(message)
    if (Array.isArray(value) && value.length == 0) throw new TigreError(message)
    if (typeof value == 'string' && !value.trim()) throw new TigreError(message)
}

const notExistsOrError = (value, message) => {
    try {
        existsOrError(value, message)
    } catch (message) {
        return
    }

    throw new TigreError(message)
}

const equalsOrError = (valueA, valueB, message) => {
    if (valueA !== valueB) throw new TigreError(message)
}

module.exports = {
    existsOrError,
    notExistsOrError,
    equalsOrError
}