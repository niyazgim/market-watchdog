const resultsContainer = document.querySelector('.results__container')
const searchForm = document.querySelector('.search-product')
const resInfo = document.querySelector('.res-num_upload-more')

let page = 1

async function getResults() {
    let query = {
        query: searchForm.s.value
    }
    const res = await fetch('/searchProducts', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(query),
    })
    if (!res.ok) {
        console.log("Error on trying get products list");
        throw res;
    }
    if (res.status === 204) {
        return [];
    }
    const content = await res.json()
    return content
}

async function renderProducts() {
    let resArr = await getResults();
    await resArr.sort((a, b) => a.price-b.price);
    await console.log(resArr);
    document.querySelector('.results__preloader').style.display = 'none'
    resInfo.innerHTML += `
    <p class="res-text">
        <span class="res-num-text"></span> результатов по запросу <span class="search-querry-text"></span>
    </p>`
    document.querySelector('.res-num-text').textContent = resArr.length
    document.querySelector('.search-querry-text').textContent = searchForm.s.value

        //  <div class="result__label">
        //     <img src="assets/img/icons/moving.svg" alt="biggest-sales_icon">
        //     <span>Самые точные отзывы</span>
        // </div>
        // <div class="result__label">
        //     <img src="assets/img/icons/sell.svg" alt="lowest-price_icon">
        //     <span>Самая низкая цена</span>
        // </div>
        // <button class="result__fav_btn">
        //     <img src="assets/img/icons/favorite.svg" alt="favorite">
        // </button>
        
    resArr.forEach(e => {
    resultsContainer.innerHTML += `
        <div class="result">
            <div class="result__container">
                <div class="result__product-info">
                <p class="product-name-text">${e.name}</p>
                <p class="product-price-text">${e.price}<span class="currency-type-text">₽</span></p>
                </div>
                <div class="result__raiting-info">
                    <div class="result__raiting-text-img">
                        <img src="assets/img/icons/star.svg" alt="star_icon">
                        <p class="result__raiting">${e.raiting}</p>
                    </div>
                    <div class="result__raiting-text-img">
                        <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
                        <p class="result__reviews-count">${e.reviewsCount}</p>
                    </div>
                    <div class="result__raiting-text-img">
                        <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
                        <p class="result__raiting-relevance">${e.rateRelevance}</p>
                    </div>
                </div>
                <a href="${e.link}" target="_blank" class="marketplace_btn">
                    <p>WB</p>
                    <img src="assets/img/icons/east.svg" alt="btn_arrow">
                </a>
                <div class="result__btns-mobile">
                    <div class="result__raiting-info">
                        <div class="result__raiting-text-img">
                            <img src="assets/img/icons/star.svg" alt="star_icon">
                            <p class="result__raiting">${e.raiting}</p>
                        </div>
                        <div class="result__raiting-text-img">
                            <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
                            <p class="result__reviews-count">${e.reviewsCount}</p>
                        </div>
                        <div class="result__raiting-text-img">
                            <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
                            <p class="result__raiting-relevance">${e.rateRelevance}</p>
                        </div>
                    </div>
                    <a href="${e.link}" target="_blank"  class="marketplace_btn">
                        <p>WB</p>
                        <img src="assets/img/icons/east.svg" alt="btn_arrow">
                    </a>
                </div>
            </div>
        </div>`
    })
}

searchForm.onsubmit = (e) => {
    e.preventDefault()
    resultsContainer.innerHTML += `<div class="results__preloader"><span class="loader"></span></div>`
    renderProducts()
}