const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController')
const connect = require('../../dataBase/db')

async function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        const result = await connect.execute("SELECT * FROM user WHERE _id = ?",[req.session.userId])
        if(result[0][0].role_id > 1) {
            return next();
        }
    }
    res.redirect('/');
}

router.get('/',isAuthenticated, async (req, res) => {
    const result = await userController.getAllUsers()
    const users = JSON.parse(result)
    await res.render("admin", {
        isBanned: false,
        users: users,
        isLogged: true,
        isAdmin: true,
    })
});

router.route('/admin')

module.exports = router;