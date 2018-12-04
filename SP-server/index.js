const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')

const db = mongoose.connect(`mongodb://mongo/sp-server`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '450mb', extended: true }))
app.use(session({
    secret: "sp-server",
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified})
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

const ParkingLot = require('./src/Models/ParkingLot')
const ParkingLotRouter = require('./src/Router/ParkingLotRouter')()

app.listen(8081)
// init middleWare to response in a confined matter
app.use((req, res, next) => {
    res.handleError = (err) => {
        res.status(400).json({message: err.message})
    }

    res.handleSuccess = (payload) => {
        res.status(200).json({payload})
    }
    next()
})
app.get('/test', (req,res) => {
    return res.send({message: 2})
})

app.use('/v1', ParkingLotRouter)