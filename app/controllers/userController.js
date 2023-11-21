const userModel = require('../models/userModel')

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/');
}

const regUser = async (req,res) => {
    return await userModel.regUser(req)
}

const getAllUsers = (isAuthenticated , async (req,res) => {
    return await userModel.getAllUsers(req)
})

module.exports = {
    regUser,
    getAllUsers
}