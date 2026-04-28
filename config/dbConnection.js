const mongoose = require('mongoose')

const dbConnection=()=>{
  mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("databaseconnection");
    
  })
}
module.exports=dbConnection