// the issue of none applying model is that 'extention' it has was ',js' not '.js' 😂
const mainModule = require('../models/mainModel')

const getProducts = async (req,res) => {
    let products = await mainModule.getProductsList(req)
    return products
}

module.exports = {
    getProducts,
}