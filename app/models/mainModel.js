const { chromium } = require('playwright')

const getProductsList = async (req,res) => {
    let pageNum = 1
    let sortType = 'popular'
    const browser = await chromium.launch({ headless: false,})
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(`https://wildberries.ru/catalog/0/search.aspx?page=${pageNum}&sort=${sortType}&search=${req}`) 

    await page.waitForSelector('.product-card-list')

    let previousHeight
    // if there is no raiting need to set null and dont sort it
    const scrollToEnd = async () => {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                let distance = 100;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100); // Adjust the scrolling speed if necessary
            });
        });
    };
    
    await scrollToEnd();
    const products = await page.$$eval('.product-card-list article.product-card', (elements) => {
        return elements.map((element) => {
            const pid = element.dataset.nmId
            const link = element.querySelector('a.product-card__link').href.trim()
            const name = element.querySelector('h2.product-card__brand-wrap').textContent.trim()
            const price = parseFloat(element.querySelector('.price__lower-price').textContent.replace(/[^\d.]/g, ''))
            const priceOld = parseFloat(element.querySelector('.price__wrap > del').textContent.replace(/[^\d.]/g, ''))
            const raiting = parseFloat(element.querySelector('.address-rate-mini').textContent.replace(/[^\d.]/g, ''))
            const reviewsCount = parseFloat(element.querySelector('.product-card__count').textContent.trim().replace(/[^\d.]/g, ''))
            const rateRelevance = parseFloat((parseFloat(element.querySelector('.address-rate-mini').textContent.trim().replace(/[^\d.]/g, '')) / parseInt(element.querySelector('.product-card__count').textContent.trim().replace(/[^\d.]/g, '')))).toFixed(5)
            return { pid, link, name, price, priceOld, raiting, reviewsCount, rateRelevance }
        })
    })

    await browser.close()
    return JSON.stringify(products)
}

module.exports = {
    getProductsList,
}