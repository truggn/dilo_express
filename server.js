require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const helmet = require('helmet')
const morgan = require('morgan')
const responseTime = require('response-time')
const compression = require('compression')
const connecDatabase = require('./src/config/database')

//DB CONNECTING
connecDatabase.connect()

const app = express()
// APP USE middleware
app.use(helmet())
app.use(morgan('dev'))
app.use(compression())
app.use(responseTime())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

// routers
app.use(require('./src/api/v1/routers/index.router'))


// handleError 
app.use((req, res, next)=>{
    next(createError(404,'Not found!'))
})
app.use((req, res, next)=>{
    next(createError.InternalServerError('This is a Error server'))
})
app.use((error,req, res, next)=>{
    res.status(error.status  || 500)
    res.json({
        status: error.status || 500 ,
        message: error.message
    })
})

const PORT = process.env.PORT || 4001

app.listen(PORT, ()=>{
    console.log(`Server started on Port ${PORT}`)
})