// const productsModel = require('../models/mainModule')
const { chromium } = require('playwright')

const getProducts = async (req) => {
    console.log(req)
    // let pageNum = 1
    // let sortType = 'popular'
    // const browser = await chromium.launch({ headless: false,})
    // const context = await browser.newContext()
    // const page = await context.newPage()
    // await page.goto(`https://wildberries.ru/catalog/0/search.aspx?page=${pageNum}&sort=${sortType}&search=${req}`) 

    // await page.waitForSelector('.product-card-list')

    // const products = await page.$$eval('.product-card-list article.product-card', (elements) => {
    //     return elements.map((element) => {
    //         const id = element.dataset.id
    //         const name = element.querySelector('h2.product-card__brand-wrap').textContent.trim()
    //         const price = element.querySelector('.price__lower-price').textContent.trim()
    //         const priceOld = element.querySelector('.price__wrap > del').textContent.trim()
    //         const rateNum = (parseFloat(element.querySelector('.address-rate-mini').textContent.trim()) / parseInt(element.querySelector('.product-card__count').textContent.trim())).toFixed(5)
    //         return { id, name, price, priceOld, rateNum }
    //     })
    // })

    // await browser.close()
    // console.log(JSON.stringify(products))
}

module.exports = {
    getProducts,
}