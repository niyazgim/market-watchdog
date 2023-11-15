const fetch = require('node-fetch')

const getProductsList = async () => {
    const req = 'продукты'
    const enCodedreq = encodeURI(req)
    let data = await fetch(`https://wildberries.ru/catalog/0/search.aspx?search=${req}`)
    return data
}

module.exports = {
    getProductsList,
}