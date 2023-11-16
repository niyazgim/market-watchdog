const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')

router.get('^/$|/index(.html)?', (req, res) => {
    res.render("index")
    // get querry process
    if(req.query.s) {
        productsController.getProducts(req.query.s)
    }
});

// use there an post querry for get an search form querry

router.route('/')

module.exports = router;