const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.onclick = () => {
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = getScrollbarWidth() + 'px'
        const currentModalWindow = document.querySelector(`#${e.id}-modal`)
        currentModalWindow.classList.toggle('hidden')
        if(currentModalWindow.id = 'subscribe-info-modal') {
            const planInfo = plansContent[e.dataset.planId]

            currentModalWindow.querySelector('.subscribe__name').textContent = planInfo['name']
            currentModalWindow.querySelector('.subscribe__desc').textContent = planInfo['desc']

            const planBenefits = planInfo['benefits'];
            if(planBenefits) {
                const planBenefitsContainer = currentModalWindow.querySelector('.subscribe__benefits')
                let planBenefitsText = ''
                for(let i of planBenefits) {
                    planBenefitsText += `
                        <div class="benefit">
                            <img src="assets/img/icons/${i['img']}" alt="infinite_icon">
                            <span>${i['text']}</span>
                        </div>`
                    planBenefitsContainer.innerHTML = planBenefitsText
                }
            }

            if(planInfo['priceOld']) {
                priceText = `
                    <p class="total__old-price">
                        ${planInfo['priceOld']}
                    </p>
                    <p class="total__actual-price">
                        ${planInfo['price']} <span class="price-currency-period">₽/мес.</span>
                    </p>`
                currentModalWindow.querySelector('.total__price_container').innerHTML = priceText
            }
        }
        currentModalWindow.querySelector('.close-modal').onclick = () => {
            currentModalWindow.classList.toggle('hidden')
            document.body.style.overflow = ""
            document.body.style.paddingRight = 0
        }
    }
})