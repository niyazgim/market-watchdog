const resultsContainer = document.querySelector('.results__container')

let page = 1

async function getResults() {
    const res = await fetch('/getProducts', {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json",
        },
    })
    if (!res.ok) {
        console.log("Error trying to load the list of users: ");
        throw res;
    }
    if (res.status === 204) {
        return [];
    }
    const content = await res.json()
    return content
        page++
        
        let dataSortedByPrice = data.sort((a, b) => 
        a.price - b.price)
        console.log(dataSortedByPrice)
        // let dataSortedByPrice = data.sort(function(a, b) {
        //     var keyA = a.price,
        //     keyB = b.price;
        //     if (keyA < keyB) return -1;
        //     if (keyA > keyB) return 1;
        //     return 0;
        // });

        // if there are no raiting, just skip it
        let mostRelavatedReviews =  data.sort((a, b) => 
        b.rateRelevance - a.rateRelevance)
        console.log(mostRelavatedReviews)

        for(let i = 0; i < Object.keys(mostRelavatedReviews).length; i++) {
            if(mostRelavatedReviews[i].rateRelevance > 0) {
                console.log(mostRelavatedReviews[i])
                break
            }
        }

        //     <div class="result__label">
        //         <img src="assets/img/icons/moving.svg" alt="biggest-sales_icon">
        //         <span>Самые точные отзывы</span>
        //     </div>
        //     <div class="result__label">
        //         <img src="assets/img/icons/sell.svg" alt="lowest-price_icon">
        //         <span>Самая низкая цена</span>
        //     </div>
        
        dataSortedByPrice.forEach(e => {
            resultsContainer.innerHTML += `
            <div class="result">
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
                        <button class="result__fav_btn">
                        <img src="assets/img/icons/favorite.svg" alt="favorite">
                        </button>
                        <a href="${e.link}" target="_blank"  class="marketplace_btn">
                            <p>WB</p>
                            <img src="assets/img/icons/east.svg" alt="btn_arrow">
                        </a>
                    </div>
                </div>
            </div>`
        })
        document.querySelector('.results__preloader').style.display = 'none'
}
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

async function renderProducts() {
    let resArr = await getResults();
    await resArr.sort((a, b) => a.price-b.price);
    await console.log(resArr);
}

if(params.s) {
    resultsContainer.innerHTML += `
    <div class="results__preloader">
    <div class="content">
    <div class="bars">
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
            </div>
            <div class="bars">
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
                <div class="bar">
                </div>
            </div>
        </div>
    </div>`
    renderProducts()
}