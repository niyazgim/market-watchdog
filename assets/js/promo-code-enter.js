const promoCodeForm = document.querySelector('.promo-code_form')

promoCodeForm.onsubmit = (e) => {
    e.preventDefault()

    if(promoCodeForm.promoCode.value === 'TEST') {
        promoCodeForm.querySelector('.promo-code-res').textContent = 'промокод успешно активирован'
    }
    else {
        promoCodeForm.querySelector('.promo-code-res').textContent = 'неверный промокод'
    }
}