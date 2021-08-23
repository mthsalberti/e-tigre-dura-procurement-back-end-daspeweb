const router = require('express').Router()
const defaultResource = require('./resources/default')
//resources
const get = require('./resources/default')

router.all('/api/:table', defaultResource.ALL)
router.all('/api/:table/:id', defaultResource.ALL)

module.exports = router