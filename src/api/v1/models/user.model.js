const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({

    UserName:{
        type: String
    },
    Avatar: {
        type: String
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    CMND:{
        type: Number
    },
    Address:{
        type: String
    },
    Email:{
        type:String
    },
    Password: {
        type: String,
    },
    Total_DiloCoin:{
        type: Number,
        default:0
    },
    isPasswordFailure:{
        type: Number,
        default:0
    },
    isLockAcount: {
        type: Boolean,
        default: false // neu tai khoan bi block -> reset isLockAcount is 'true'
    },
    TypeAccount:{
        enum: [0,1], // basic and vip
        default: 0 // -> basic
    },
    roles: {
        enum: [0,1], // admin and user
        default: 0 // -> user
    },
    token: {
        type: String
    },
    refreshToken:{
        type: String
    },
    deleteAt: { type: Date, default: null },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: null },
})

// userSchema.pre('save', async function (next) {
//     try {
//       console.log('entered');
//       if (!this.methods.includes('local')) {
//         next();
//       }
//       //the user schema is instantiated
//       const user = this;
//       //check if the user has been modified to know if the password has already been hashed
//       if (!user.isModified('local.password')) {
//         next();
//       }
//       // Generate a salt
//       const salt = await bcrypt.genSalt(10);
//       // Generate a password hash (salt + hash)
//       const passwordHash = await bcrypt.hash(this.local.password, salt);
//       // Re-assign hashed version over original, plain text password
//       this.local.password = passwordHash;
//       console.log('exited');
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });
  
//   userSchema.methods.isValidPassword = async function (newPassword) {
//     try {
//       return await bcrypt.compare(newPassword, this.local.password);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

const User = mongoose.model('User', userSchema)

module.exports = User;