const express = require('express')
const mongoose = require('mongoose')
const ParkingLot = mongoose.model('ParkingLot')
const calculator = require('../Middlewares/CalculateState')

const ParkingLotRouter = () => {
    const router = express.Router()

    /**
     * Get every Parking Lot from DB
     */
    router.get('/parking-lot', (req,res) => {
        ParkingLot.find()
            .then(res.handleSuccess)
            .catch(res.handleError)
    })

    /**
     * Get one Parking Lot from DB by it's name
     */
    router.get('/parking-lot/:name', (req,res) => {
        ParkingLot.findOne({name: req.params.name})
            .then(res.handleSuccess)
            .catch(res.handleError)
    })

    /**
     * Create a new Parking Lot
     */
    router.post('/parking-lot', calculator.calculateState, (req,res) => {
        if (req.body.name.length < 1){
            return res.handleError({message: "Name should be at least 1 character long."})
        }

        let parkingLot = new ParkingLot()
        let event = {}
        event.state = req.body.sensorValue
        event.changeDate = Date()

        parkingLot.name = req.body.name || ""
        parkingLot.currentState = req.body.sensorValue || ""
        parkingLot.events = [event]
        parkingLot.latitude = req.body.latitude || ""
        parkingLot.longitude = req.body.longitude || ""

        parkingLot.save()
            .then(res.handleSuccess)
            .catch(res.handleError)
    })

    /**
     * Change the state of a Parking Lot
     */
    router.patch('/parking-lot/:name', calculator.calculateState, (req,res) => {
        ParkingLot.findOne({name: req.params.name})
            .then((parkingLot) => {
                if ( req.body.sensorValue == parkingLot.currentState ){
                    return Promise.resolve()
                }

                let event = {}
                event.state = req.body.sensorValue
                event.changeDate = Date()

                parkingLot.currentState = req.body.sensorValue
                parkingLot.events.push(event)
                return parkingLot.save()
            })
            .then(res.handleSuccess)
            .catch(res.handleError)
    })

    /**
     * Delete a Parking Lot
     */
    router.delete('/parking-lot/:name', (req,res) => {
        ParkingLot.remove({name: req.params.name})
            .then(res.handleSuccess)
            .catch(res.handleError)
    })

    return router
}

module.exports = ParkingLotRouter