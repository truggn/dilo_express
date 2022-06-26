'use strict';

const { 
    registerUser,
    verifyOTP
} = require('../services/user.services')

const that = module.exports = {


    // VERYFI OTP
    verifyOTP: async (req, res, next) =>{
        try {
            const {
                phoneNumber,
                otp,
            } = req.body

            const {
                code,
                elements,
                message
            } = await verifyOTP({
                phoneNumber,
                otp
            })

            return res.status(code).json({
                code,
                elements,
                message
            })
        } catch (error) {
            next(error)
        }
    },
    
    // REGISTER ACCOUNT 
    registerUser: async (req, res,next)=>{
        try {
            const { phoneNumber }= req.body;
            const {
                code,
                message,
                elements
            } = await registerUser({ phoneNumber})
                    return res.status(code).json({
                        code,
                        message,
                        elements
                    })
        //
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}