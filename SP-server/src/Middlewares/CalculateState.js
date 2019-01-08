module.exports = { 
    /**
     * if sensorValue === 1 -> occupied
     * if sensorValue === 0 -> free
     * if none of these above, than its unknown
     */
    calculateState: (req,res,next) => {
        let futureValue

        // decider
        switch(req.body.sensorValue){
            case 0: {
                futureValue = "free"
                break
            }
            case 1: {
                futureValue = "occupied"
                break
            }
            default: {
                futureValue = "unknown"
            }
        }

        // equaling the sensorValue to the calculated value
        req.body.sensorValue = futureValue

        return next()
    }
 }