const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')
const connect = require('../dataBase/db')
const userController = require('../controllers/userController')
const { regValidator } = require('../models/userModel')
const { validationResult } = require('express-validator')
const bcrypt = require("bcrypt")

async function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        const result = await connect.execute("SELECT * FROM user WHERE _id = ?",[req.session.userId])
        if(result[0][0].role_id > 1) {
            return next();
        }
    }
    console.log('no')
    res.redirect('/');
}

async function isAdmin(req, res, next) {
    if (req.session.userId) {
        const result = await connect.execute("SELECT * FROM user WHERE _id = ?",[req.session.userId])
        if(result[0][0].role_id > 2) {
            return next();
        }
    }
    res.redirect('/');
}

router.get('/', async (req, res) => {
    if(req.session.userId) {
        connect.query("SELECT * FROM user WHERE _id = ?",[req.session.userId])
            .then((result)=>{
                if(result[0][0].role_id == 1) {
                    res.render("index--banned", {
                        isBanned: true,
                        isLogged: true,
                        title: 'main page',
                        isAdmin: true
                    })
                } else if(result[0][0].role_id > 2) {
                    res.render("index--registered", {
                        isBanned: false,
                        isLogged: true,
                        title: 'main page',
                        isAdmin: true
                    })
                } else {
                    res.render("index--registered", {
                        isBanned: false,
                        isLogged: true,
                        title: 'main page',
                        isAdmin: false
                    })
                } 
            })
    } else {
        res.render("index--not-registered", {
            isBanned: false,
            isLogged: false,
            title: 'parser watchdog',
        })
    }
});

router.post('/searchProducts', isAuthenticated,  async (req,res) => {
    let products = await productsController.getProducts(req.body.query)
    res.send(products) 
}) 

router.post('/regUser', [
    regValidator,
], async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    userController.regUser(req)
    res.redirect('/');
})

router.post('/logUser', async (req, res) => {
    const { email, pass_1 } = req.body;
    const user = await connect.query("SELECT * FROM user WHERE email = ?",[email]);
    let isMatch
    if(user[0][0]) {
        isMatch = await bcrypt.compare(pass_1, user[0][0].password)
    } else {
        isMatch = false
    }
    let errors = []
    if (!user[0][0]) {
        errors.push({ 'msg' : 'Email неверный', 'path' : 'email' })
    }
    if(!isMatch) {
        errors.push({ 'msg' : 'Пароль неверный' , 'path' : 'pass_1' })
    }
    if(errors.length != []) {
        return res.status(400).json(errors)
    }
    else {
        req.session.userId = user[0][0]._id;
        console.log(user[0])
        console.log(user[0][0])
        console.log('user is logged')
        res.redirect('/');
    }
});

router.post('/delUser', isAdmin, async (req, res) => {
    const { _id } = req.body;
    await connect.query("DELETE FROM user WHERE _id = ?",[_id]);
    let errors = []
    if(errors.length != []) {
        return res.status(400).json(errors)
    }
    else {
        console.log(`delete user with id ${_id}`)
        res.redirect('/');
    }
});
router.post('/blockUser', isAdmin, async (req, res) => {
    const { _id } = req.body;
    await connect.query("UPDATE `user` SET `role_id`= 1 WHERE _id = ?", [_id]);
    let errors = []
    if(errors.length != []) {
        return res.status(400).json(errors)
    }
    else {
        console.log(`block user with id ${_id}`)
        res.redirect('/');
    }
});
router.post('/unblockUser', isAdmin, async (req, res) => {
    const { _id } = req.body;
    await connect.query("UPDATE `user` SET `role_id`= 2 WHERE _id = ?", [_id]);
    let errors = []
    if(errors.length != []) {
        return res.status(400).json(errors)
    }
    else {
        console.log(`unblock user with id ${_id}`)
        res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
    if (err) {
        console.error(err);
    }
    res.redirect('/');
    });
});

router.route('/')

module.exports = router;