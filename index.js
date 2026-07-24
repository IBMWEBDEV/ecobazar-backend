require('node:dns').setServers(['1.1.1.1', '8.8.8.8']);
const multer = require('multer');
const bcrypt = require('bcrypt');
require('dotenv').config()
const express = require("express")
const app = express()
const cors = require('cors')
const dbConfig = require("./config/dbConfig")
const { registrationController, loginController, forgotPasswordController, resetPasswordController, resendVerificationEmailController, verifyEmailController } = require('./controllers/authenticationController');
const { getAllUsersController, singleUserDataController, deleteUserController, updateUserController } = require('./controllers/userController');
const { createProductController, getProductController, getSingleProductController, productDeleteController, productUpdateController } = require('./controllers/productController');
const { createCart, increDecre, prodelete, getCart } = require('./controllers/cartController');
const axios = require('axios');
const { paymentController } = require('./controllers/paymentController');





const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, '/uploads/products'),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '_' + file.originalname);
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.json())
app.use(cors())

// Database config
dbConfig()


app.post('/registration', registrationController)
app.post('/login', loginController)
app.post('/forgotPassword', forgotPasswordController)
app.post('/resetpassword/:token', resetPasswordController)
app.post('/resendVerificationEmail', resendVerificationEmailController)
app.post('/verifyemail/:token', verifyEmailController)

//Product Create
app.post('/createproduct', upload.array('photos', 5), createProductController);
app.get('/allproduct', getProductController)
app.get('/singleproduct/:id', getSingleProductController)
app.delete('/deleteproduct/:id', productDeleteController)
app.put('/updateproduct/:id', upload.array('photos', 5), productUpdateController)


//Payment
// app.post('/payment', async function(req, res) {

//     let data = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', {
//         store_id: "aamarpaytest",
//         signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
//         ...req.body,
//         tran_id: Date.now(),
//         currency: "BDT",
//         success_url: "https://example.com/success.php",
//         fail_url: "https://example.com/fail.php",
//         cancel_url: "https://example.com/cancel.php",
//         desc: "Lend Money",
//         type: "json"
//     })
//     res.send(data.data)

// })

//Cart Management
app.post('/cart/create', createCart)
app.post('/cart/update/:id', increDecre)
app.get('/cart/:userId', getCart)
app.delete('/cart/:id', prodelete)

//Order Management
app.post('/payment', paymentController)

//user management
app.get('/allusers', getAllUsersController)
app.get('/singleuser/:id', singleUserDataController)
app.delete('/deleteuser/:id', deleteUserController)
app.post('/update/:id', updateUserController)




let port = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server running on port ${port}`)
})