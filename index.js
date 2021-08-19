require('dotenv').config()

const app = require('express')()
const port = 3000
const queries = require('./src/api/index')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(require('express').json())
app.use(queries)

app.listen(port, () => console.log(`listening... ${port}`))