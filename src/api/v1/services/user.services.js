'use strict';
const sendOTP = require('otp-generator')
const {
     insertOtp,
     validOtp
}= require('../services/otp.service')
// Models
const _User = require('../models/user.model')
const _OTP = require('../models/otp.model')

//service
const that = module.exports = {
    
    // verify otp 
        verifyOTP: async ({
            phoneNumber,
            otp
        })=>{
            try {
                // check phonenumber này có tồn tại  chưa 
                const  otpHolder = await _OTP.find({
                    phoneNumber
                })
                // check otp đã hết hạn chưa
                if(!otpHolder.length){
                    return {
                        code: 404,
                        message:'Exprired OTP'
                    }
                }
                // nếu mà otp còn sống.
                const lastOTP = otpHolder[otpHolder.length - 1]
                // check otp
                const isValid = await validOtp({
                     otp,
                     otpHash: lastOTP.otp
                })
                if(!isValid){
                    return {
                        code: 401,
                        message:'Invalid Otp'
                    }
                }
                if(isValid && phoneNumber === lastOTP.phoneNumber){
                    const randomNameUser = sendOTP.generate(15,{
                        digits: true,
                        upperCaseAlphabets: false,
                        specialChars: false,
                        lowerCaseAlphabets: true
                    })
                    // tao user
                    const user = await _User.create({
                        phoneNumber,
                        UserName:randomNameUser.concat(phoneNumber)
                    })
                    if(user){
                        // neu tao user thanh cong thi xoa otp di
                        await _OTP.deleteMany({
                            phoneNumber
                        })
                    }
                    return {
                        code: 201,
                        elements: user
                    }
                }
            } catch (error) {
                console.log(error)
            }
        },

    // thực hiện đăng ký bằng số điện thoại
        registerUser: async ({
            phoneNumber    
        })=>{
            const user = await _User.findOne({
                phoneNumber
            })
            // check nếu như sdt này tồn tại 
            if(user) return { code: 400, message: 'This phone number is already in use!'}
            //send otp
            const OTP = sendOTP.generate(6,{
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false
            })
            console.log('otp',OTP)
            return {
                code: 200,
                elements: await insertOtp({
                    phoneNumber,
                    otp:OTP
                })
            }
        }
} 
