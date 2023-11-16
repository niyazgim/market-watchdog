// the issue of none applying model is that 'extention' it has was ',js' not '.js' 😂
const mainModule = require('../models/mainModel')

const getProducts = async (req,res) => {
    res = await mainModule.getProductsList(req)
    
}

module.exports = {
    getProducts,
}