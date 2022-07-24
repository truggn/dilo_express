const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(process.env.DBLOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected Successfully to Database.");

    } catch (error) {
        console.log(`Connect to db False  with Error ${error}`);
    }
}
module.exports = { connect };