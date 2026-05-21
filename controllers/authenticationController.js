const { mailVerification } = require("../utils/email")
const User = require('../models/userModels')
const { emptyFieldValidation } = require("../utils/validation")
const tokenGenerator = require("../utils/tokenGenerator")
const existingData = require("../utils/existingData")

let registrationController = async(req, res) => {
    const { email, password, confirmPassword, terms } = req.body

    let users = await existingData(res, { email: email })
    if (users) {
        return
    }

    if (!terms) {
        return res.send({ message: "Please Accept Our Terms and Condition" })
    }


    emptyFieldValidation(res, email, password, confirmPassword)

    if (password !== confirmPassword) {
        return res.send({ message: "password no matched" })
    }

    let user = new User({
        email: email,
        password: password,
        terms: terms
    })

    user.save()

    let token = tokenGenerator({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET, "1d")

    mailVerification(token, email)

    res.send({ message: "Registration Successfull" })

}
module.exports = { registrationController }


// const { mailVerification } = require("../utils/email")
// const User = require('../models/userModels')
// const { emptyFieldValidation } = require("../utils/validation")
// const tokenGenerator = require("../utils/tokenGenerator")
// const existingData = require("../utils/existingData")

// let registrationController = async(req, res) => {
//     const { email, password, confirmPassword, terms } = req.body

//     if (await existingData({ email: email })) {
//         return res.send({ message: "User already exists" });
//     }

//     if (!terms) {
//         return res.send({ message: "Please Accept Our Terms and Condition" })
//     }


//     emptyFieldValidation(res, email, password, confirmPassword)

//     if (password !== confirmPassword) {
//         return res.send({ message: "password no matched" })
//     }

//     let user = new User({
//         email: email,
//         password: password,
//         terms: terms
//     })

//     await user.save();

//     const token = tokenGenerator({
//         id: user.id,
//         email: user.email
//     }, process.env.ACCESS_TOKEN_SECRET, "1d")

//     await mailVerification(token, email);

//     res.send({ message: "Registration Successfull" })

// }
// module.exports = { registrationController }