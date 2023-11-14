const express = require('express');
const router = express.Router();
const productsController = require('../controllers/mainController')

router.get('^/$|/index(.html)?', (req, res) => {
    res.render("index")
    productsController.getProducts('кроссовки')
});

router.route('/?s')

module.exports = router;