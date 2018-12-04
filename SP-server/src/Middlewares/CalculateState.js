module.exports = { 
    calculateState: (req,res,next) => {
        /**
         * Calculate the new state, change it in req.body.sensorValue after calculation
         */

        return next()
    }
 }