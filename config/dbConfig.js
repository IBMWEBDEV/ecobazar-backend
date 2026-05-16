const mongoose = require('mongoose')

const dbConfig = () => {
    mongoose.connect('mongodb+srv://ecobazar:WtgqzeNGPwmLCzSE@cluster0.p4jqrrq.mongodb.net/ecobazar?appName=Cluster0').then(() => {
        console.log("Database Connected")
    })
}

module.exports = dbConfig