const userModel = require('../models/userModel')

const regUser = async (req,res) => {
    return await userModel.regUser(req.body)
}

module.exports = {
    regUser,
}