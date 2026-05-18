const jwt = require('jsonwebtoken')

let secureMiddleWare = (req, res, next) => {
    let secureMiddleWare = req.headers.authorization



    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err) {
            res.send({ message: "Unauthorization" })
        } else {
            next()
        }
    });

    a
    //   let data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

}
module.exports = secureMiddleWare