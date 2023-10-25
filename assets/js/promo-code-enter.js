const promoCodeForm = document.querySelector('.promo-code_form')

if(promoCodeForm) {
    promoCodeForm.onsubmit = (e) => {
        e.preventDefault()
    
        if(promoCodeForm.promoCode.value === 'TEST') {
            promoCodeForm.querySelector('.input__status-text').textContent = 'промокод успешно активирован'
            promoCodeForm.querySelector('.input__status-text').style.color = 'var(--text-color--valid)'
            promoCodeForm.querySelector('.input__err-img').classList.add('hidden')
            promoCodeForm.querySelector('.form__input').classList.remove('invalid')
            promoCodeForm.querySelector('.form__input').classList.add('valid')
        }
        else {
            if(promoCodeForm.promoCode.value) promoCodeForm.querySelector('.input__status-text').textContent = 'Неверный промокод'
            else promoCodeForm.querySelector('.input__status-text').textContent = 'Введите промокод'
            promoCodeForm.querySelector('.input__status-text').style.color = 'var(--text-color--invalid)'
            promoCodeForm.querySelector('.input__err-img').classList.remove('hidden')
            promoCodeForm.querySelector('.form__input').classList.add('invalid')
            promoCodeForm.querySelector('.form__input').classList.remove('valid')
        }
    }
}