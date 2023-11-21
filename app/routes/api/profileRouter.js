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
    const user = await userController.getUser(req.session.userId)
    if(user[0][0].role_id > 2) {
        res.render("profile", {
            isBanned: false,
            isLogged: true,
            title: 'profile',
            isAdmin: true,
            user: user[0][0],
        })
    } else {
        res.render("profile", {
            isBanned: false,
            isLogged: true,
            title: 'profile',
            isAdmin: false,
            user: user[0][0],
        })
    } 
});

router.route('/profile')

module.exports = router;