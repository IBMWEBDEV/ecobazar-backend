require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const dbConfig = require("./config/dbConfig")

// Middleware
app.use(express.json())
app.use(cors())

// Database config
dbConfig()

app.get("/", (req, res) => {
    res.send("ggggggg")
})

let port = process.env.PORT || 5000
app.listen(5000, () => {
    console.log(`Server running on port 5000 ${port}`)
})