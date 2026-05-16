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
    res.send("ibrahim")
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})