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
        console.log(data)
        // it works only that way i think
        let dataSortedByPrice = data.sort(function(a, b) {
            var keyA = new Date(a.price),
            keyB = new Date(b.price);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        console.log(dataSortedByPrice)
        // if there are no raiting, just skip it
        let mostRelavatedReviews = data
            .filter(obj => typeof obj.value !== 'undefined')
            .sort((a,b) => a.rateRelevance - b.rateRelevance);
        mostRelavatedReviews = mostRelavatedReviews[0]
        console.log(mostRelavatedReviews)
        // resultsContainer.innerHTML += `
        // <div class="result recommend">
        //     <div class="result__label">
        //         <img src="assets/img/icons/moving.svg" alt="biggest-sales_icon">
        //         <span>Самые точные отзывы</span>
        //     </div>
        //     <div class="result__container">
        //         <button class="result__fav_btn">
        //             <img src="assets/img/icons/favorite.svg" alt="favorite">
        //         </button>
        //         <div class="result__product-info">
        //             <p class="product-name-text">apple air pods</p>
        //             <p class="product-price-text">7000<span class="currency-type-text">₽</span></p>
        //         </div>
        //         <div class="result__raiting-info">
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/star.svg" alt="star_icon">
        //                 <p class="result__raiting">4.3</p>
        //             </div>
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
        //                 <p class="result__reviews-count">21 000</p>
        //             </div>
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
        //                 <p class="result__raiting-relevance">0.0002</p>
        //             </div>
        //         </div>
        //         <a href="" class="marketplace_btn">
        //             <p>WB</p>
        //             <img src="assets/img/icons/east.svg" alt="btn_arrow">
        //         </a>
        //         <div class="result__btns-mobile">
        //             <div class="result__raiting-info">
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/star.svg" alt="star_icon">
        //                     <p class="result__raiting">4.3</p>
        //                 </div>
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
        //                     <p class="result__reviews-count">21 000</p>
        //                 </div>
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
        //                     <p class="result__raiting-relevance">0.0002</p>
        //                 </div>
        //             </div>
        //             <button class="result__fav_btn">
        //                 <img src="assets/img/icons/favorite.svg" alt="favorite">
        //             </button>
        //             <a href="" class="marketplace_btn">
        //                 <p>WB</p>
        //                 <img src="assets/img/icons/east.svg" alt="btn_arrow">
        //             </a>
        //         </div>
        //     </div>
        // </div>`
        // resultsContainer.innerHTML += `
        // <div class="result recommend">
        //     <div class="result__label">
        //         <img src="assets/img/icons/sell.svg" alt="lowest-price_icon">
        //         <span>Самая низкая цена</span>
        //     </div>
        //     <div class="result__container">
        //         <button class="result__fav_btn">
        //             <img src="assets/img/icons/favorite.svg" alt="favorite">
        //         </button>
        //         <div class="result__product-info">
        //             <p class="product-name-text">${e.name}</p>
        //             <p class="product-price-text">${e.price}<span class="currency-type-text">₽</span></p>
        //         </div>
        //         <div class="result__raiting-info">
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/star.svg" alt="star_icon">
        //                 <p class="result__raiting">${e.raiting}</p>
        //             </div>
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
        //                 <p class="result__reviews-count">${e.reviewsCount}</p>
        //             </div>
        //             <div class="result__raiting-text-img">
        //                 <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
        //                 <p class="result__raiting-relevance">${e.rateRelevance}</p>
        //             </div>
        //         </div>
        //         <a href="${e.link}" target="_blank" class="marketplace_btn">
        //             <p>WB</p>
        //             <img src="assets/img/icons/east.svg" alt="btn_arrow">
        //         </a>
        //         <div class="result__btns-mobile">
        //             <div class="result__raiting-info">
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/star.svg" alt="star_icon">
        //                     <p class="result__raiting">${e.raiting}</p>
        //                 </div>
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/data_thresholding.svg" alt="reviews-count_icon">
        //                     <p class="result__reviews-count">${e.reviewsCount}</p>
        //                 </div>
        //                 <div class="result__raiting-text-img">
        //                     <img src="assets/img/icons/bolt.svg" alt="raiting-relevance_icon">
        //                     <p class="result__raiting-relevance">${e.rateRelevance}</p>
        //                 </div>
        //             </div>
        //             <button class="result__fav_btn">
        //                 <img src="assets/img/icons/favorite.svg" alt="favorite">
        //             </button>
        //             <a href="${e.link}" target="_blank"  class="marketplace_btn">
        //                 <p>WB</p>
        //                 <img src="assets/img/icons/east.svg" alt="btn_arrow">
        //             </a>
        //         </div>
        //     </div>
        // </div>`
        
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
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
getResults()