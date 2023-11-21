const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')
const connect = require('../dataBase/db')

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/');
}

router.get('^/$|/index(.html)?', async (req, res) => {
    console.log(req.session)
    console.log(req.session.userId)
    let isAdmin = false
    if(req.session.userId) {
        connect.query("SELECT * FROM user WHERE _id = ?",[req.session.userId])
            .then((res)=>{
                if(res[0][0].role_id > 2) isAdmin = true
            })
        res.render("index--registered", {
            isLogged: true,
            title: 'main page',
            isAdmin: isAdmin
        })
    } else {
        res.render("index--not-registered", {
            isLogged: false,
            title: 'parser watchdog',
        })
    }
});

router.post('/searchProducts', isAuthenticated,  async (req,res) => {
    let products = await productsController.getProducts(req.body.query)
    res.send(products)
}) 

router.route('/')

module.exports = router;