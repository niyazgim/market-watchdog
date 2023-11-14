// const productsModel = require('../models/mainModule')
const { chromium } = require('playwright');

const getProducts = async (req) => {
    const browser = await chromium.launch({ headless: false,});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(`https://wildberries.ru/catalog/0/search.aspx?search=${req}`); 

    // let articles = await page.$$("article.product-card");

    // let data = [];                 
    // for(let article of articles)
    // {
    //     data.push({
    //         article
    //         // id: await article.$eval("", el => el.dataset.nm.id),
    //         // name: await article.$eval("h2.product-card__brand-wrap", el => el.textContent),
    //         // price: await article.$eval(".price__lower-price", el => el.textContent),
    //         // priceOld: await article.$eval(".price__wrap > del", el => el.textContent),
    //     });
    // }
    // working code
    await page.waitForSelector('.product-card-list');

    const products = await page.$$eval('.product-card-list article.product-card', (elements) => {
        return elements.map((element) => {
            const id = element.dataset.id;
            const name = element.querySelector('h2.product-card__brand-wrap').textContent.trim();
            const price = element.querySelector('.price__lower-price').textContent.trim();
            const priceOld = element.querySelector('.price__wrap > del').textContent.trim();
            return { id, name, price, priceOld };
        });
    });

    await browser.close();
    console.log(JSON.stringify(products));

    // await browser.close();
    // console.log(data);  
}

module.exports = {
    getProducts,
}