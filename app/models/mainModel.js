const { chromium } = require('playwright')

const getProductsList = async (req,res) => {
    let pageNum = 1
    let sortType = 'popular'
    const browser = await chromium.launch({ headless: false,})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(`https://wildberries.ru/catalog/0/search.aspx?page=${pageNum}&sort=${sortType}&search=${req}`) 

    await page.waitForSelector('.product-card-list')

    const products = await page.$$eval('.product-card-list article.product-card', (elements) => {
        return elements.map((element) => {
            // need to fix an prices and rating count parse mistake
            const id = element.dataset.id
            const link = element.querySelector('a.product-card__link').href.trim()
            const name = element.querySelector('h2.product-card__brand-wrap').textContent.trim()
            const price = parseFloat(element.querySelector('.price__lower-price').textContent.replace(/[^\d.]/g, ''))
            const priceOld = parseFloat(element.querySelector('.price__wrap > del').textContent.replace(/[^\d.]/g, ''))
            const rating = parseFloat(element.querySelector('.address-rate-mini').textContent.replace(/[^\d.]/g, ''))
            const reviews_count = parseFloat(element.querySelector('.product-card__count').textContent.trim().replace(/[^\d.]/g, ''))
            const rateRelevance = (parseFloat(element.querySelector('.address-rate-mini').textContent.trim().replace(/[^\d.]/g, '')) / parseInt(element.querySelector('.product-card__count').textContent.trim().replace(/[^\d.]/g, ''))).toFixed(5)
            return { id, link, name, price, priceOld, rating, reviews_count, rateRelevance }
        })
    })

    await browser.close()
    return JSON.stringify(products)
}

module.exports = {
    getProductsList,
}