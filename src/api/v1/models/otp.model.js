const { Schema , model } = require("mongoose");


const otpSchema =  new Schema({
        otp:{
            type: String,
        },
        phoneNumber:{
            type: String
        },
        times:{
            type: Date, 
            default: Date.now, index: {expires: 60 } // thoi gian song la 5p
        }
},{
    collection: 'otps'
})

module.exports = model('otps', otpSchema)
