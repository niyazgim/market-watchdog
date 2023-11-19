const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')

router.get('^/$|/index(.html)?', (req, res) => {
    res.render("index")
    let search = req.query.s
    router.get('/getProducts', async (req,res) => {
        if(search) {
            let products = await productsController.getProducts(search)
            res.send(products)
        }
    })
});

router.route('/')

module.exports = router;