'use strict';

const bcrypt = require('bcrypt')
const _OTP = require('../models/otp.model')



// service OTP 

const that = module.exports = {

    // veryfi otp
    validOtp: async ({
        otp,  // otp cua user nhap
        otpHash // otp da hash lu database
    })=>{
        try {
            const isValid = await bcrypt.compare(otp,otpHash)
            return isValid;
        } catch (error) {
            console.log(error)
        }
    },

    // insert Otp 
    insertOtp : async ({
        otp,
        phoneNumber
    })=>{
            try {
                // trc tien ta can ma hoa cai otp
                const salt = await bcrypt.genSalt(10)
                const hashOTP = await bcrypt.hash(otp,salt)
                const OTP = await _OTP.create({
                    phoneNumber,
                    otp: hashOTP
                })
                return OTP ? 1 : 0  //neu tao thanh cong thi tra ve user la 1, fall thi tra ve 0 
            } catch (error) {
                console.log(error)
            }
    }

}
