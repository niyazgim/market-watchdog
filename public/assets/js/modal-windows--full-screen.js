const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.modalWindow = document.querySelector(`#${e.id}-modal`)
    e.onclick = () => {
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = getScrollbarWidth() + 'px'
        e.modalWindow.classList.toggle('hidden')
        if(e.modalWindow.id === 'subscribe-info-modal') {
            const planInfo = plansContent[e.dataset.planId]

            e.modalWindow.querySelector('.subscribe__name').textContent = planInfo['name']
            e.modalWindow.querySelector('.subscribe__desc').textContent = planInfo['desc']

            const planBenefits = planInfo['benefits'];
            if(planBenefits) {
                const planBenefitsContainer = e.modalWindow.querySelector('.subscribe__benefits')
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
                    <span class="total__old-price">
                        ${planInfo['priceOld']}
                    </span>
                    ${planInfo['price']} <span class="price-currency-period">₽/мес.</span>`
                e.modalWindow.querySelector('.total__price_container').innerHTML = priceText
            }
            //e.modalWindow.querySelector('.total-text').textContent = `Итого ${planInfo['price']}`

        }
        e.modalWindow.querySelector('.close-modal').onclick = () => {
            e.modalWindow.classList.toggle('hidden')
            document.body.style.overflow = ""
            document.body.style.paddingRight = 0
        }
    }
})