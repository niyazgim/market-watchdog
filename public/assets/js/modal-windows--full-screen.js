const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.modalWindow = document.querySelector(`#${e.id}-modal`)
    e.onclick = (event) => {
        e.modalWindow.showModal()
        document.body.style.overflow = 'hidden';
        e.modalWindow.querySelector('.close-modal').onclick = () => {
            e.modalWindow.close()
            const burgerMenuLayout = document.querySelector('.burger-menu')
            if(burgerMenuLayout && !burgerMenuLayout.classList.contains('opened')) {
                document.body.style.overflow = '';
            }
        }
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
        // e.modalWindow.querySelector('.close-modal').onclick = () => {
        //     closeModal(e.modalWindow);
        // }
        // e.modalWindow.addEventListener('click', function () {
        //     closeModal(e.modalWindow);
        // });
        // for (var i = 0; i <  e.modalWindow.childNodes.length; i++) {
        //     e.modalWindow.childNodes[i].addEventListener('click', function (event) {
        //         event.stopPropagation();
        //     });
        // }
    }
})