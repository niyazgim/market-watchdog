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
    res = await userModel.getAllUsers(req)
    return res
})
const getUser = (isAuthenticated , async (req,res) => {
    res = await userModel.getUser(req)
    return res
})

module.exports = {
    regUser,
    getAllUsers,
    getUser,
}