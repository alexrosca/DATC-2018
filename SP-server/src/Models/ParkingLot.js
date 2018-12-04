const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ParkingLotSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true 
    },
    currentState: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    events: [{
        state: {
            type: String
        },
        changeDate: {
            type: Date
        }
    }]
})

ParkingLotSchema.plugin(uniqueValidator)

module.exports = mongoose.model("ParkingLot", ParkingLotSchema)
