const jwt = require('jsonwebtoken');


const secureMiddleWare=(req,res,next)=>{
  let token = req.headers.authorization
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,function(err,decoded){
    if (err) {
      res.send({
        message:"unauthorizatied"
      })
    }else{
      next()
    }
  })
}

module.exports = secureMiddleWare