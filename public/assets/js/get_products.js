const resultsContainer = document.querySelector('.results_container')

async function getResults() {
    await fetch('/getProducts', {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
        },
    })
    .then(res => res.json())
    .then(data => {
        async function renderProducts() {

        }
        console.log(data)
        data.forEach(e => {
            resultsContainer.innerHTML += `
            <div class="result recommend">
                <div class="result__label">
                    <img src="assets/img/icons/sell.svg" alt="lowest-price_icon">
                    <span>Самая низкая цена</span>
                </div>
                <div class="result__container">
                    <button class="result__fav_btn">
                        <img src="assets/img/icons/favorite.svg" alt="favorite">
                    </button>
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
                    <a href="${e.link}" class="marketplace_btn">
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
                        <button class="result__fav_btn">
                            <img src="assets/img/icons/favorite.svg" alt="favorite">
                        </button>
                        <a href="${e.link}" class="marketplace_btn">
                            <p>WB</p>
                            <img src="assets/img/icons/east.svg" alt="btn_arrow">
                        </a>
                    </div>
                </div>
            </div>`
        })
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
getResults()