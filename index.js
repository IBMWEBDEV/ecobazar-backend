const bcrypt = require('bcrypt');
require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const dbConfig = require("./config/dbConfig")
const { registrationController, login, forgotPassword, resetpassword, resendVerificationEmail, verifyEmailController } = require('./controllers/authenticationController')



// Middleware
app.use(express.json())
app.use(cors())

// Database config
dbConfig()


app.post('/registration', registrationController)
app.post('/login', login)
app.post('/forgotPassword', forgotPassword)
app.post('/resetpassword/:token', resetpassword)
app.post('/resendVerificationEmail', resendVerificationEmail)
app.post('/verifyemail/:token', verifyEmailController)


let port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server running on port ${port}`)
})