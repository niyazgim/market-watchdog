const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')

router.get('^/$|/index(.html)?', (req, res) => {
    // res.render("index--registered")
    // let search = req.query.s
    res.render("index--not-registered")
    
    router.get('/userReg', async (req,res) => {

    })
    // router.get('/getProducts', async (req,res) => {
    //     if(search) {
    //         let products = await productsController.getProducts(search)
    //         res.send(products)
    //     }
    // })
});

router.route('/')

module.exports = router;