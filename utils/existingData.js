// const User = require('../models/userModels');
// let existingData = async(findData) => {

//     let existingUser = await User.findOne(findData);

//     if (existingUser) {
//         return true;
//     }
//     return false;
// };

// module.exports = existingData;


const User = require('../models/userModels');
let existingData = async(res, findData) => {

    let existingUser = await User.findOne(findData);

    if (existingUser) {
        res.send({ message: "User already exists" })
        return true;
    }


};

module.exports = existingData;