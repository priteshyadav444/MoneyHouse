require('dotenv').config()
const mongoose = require('mongoose')


function connectDb() {
    mongoose.connect(process.env.DB_KEY, { useNewUrlParser: true });

    const connection = mongoose.connection;
    try {
        connection.once("open", () => {
            console.log("Database connected..")
        })
    } catch (error) {
        console.log("Database connected Failed..")
        console.log(error)
    }

}
module.exports = connectDb;

