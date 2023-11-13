const addPaymentPannelOpenBtn = document.querySelectorAll('.add-payment__open-btn')

addPaymentPannelOpenBtn.forEach(e=>{
    const addPaymentContent = e.parentElement.querySelector('.add-payment__content')
    const addPaymentForm =  addPaymentContent.querySelector('.add-payment__form')
    addPaymentPannelOpenBtnImg = e.querySelector('.add-payment__btn-img')

    e.onclick = () => {
        if(!addPaymentForm.classList.contains('opened')) {
            addPaymentContent.style.padding = '20px 16px 12px'
            addPaymentContent.style.border = '1px solid var(--icons-color--dark)'
            e.style.borderRadius = '16px 16px 0 0'
    
            addPaymentPannelOpenBtnImg.animate([
                {transform: 'rotate(0deg)'},
                {transform: 'rotate(90deg)'}
            ], {
                duration:300,
            })
            addPaymentPannelOpenBtnImg.style.transform = 'rotate(90deg)'
            addPaymentForm.animate([
                {opacity: '0%',display: 'none'},
                {opacity: '100%',display: 'block'}
            ], {
                duration:100,
            })
            addPaymentForm.classList.toggle('opened')
        }
        else if(addPaymentForm.classList.contains('opened')){
            addPaymentContent.style.padding = '0'
            addPaymentContent.style.border = 'none'
            e.style.borderRadius = '16px'
            
            addPaymentPannelOpenBtnImg.animate([
                {transform: 'rotate(90deg)'},
                {transform: 'rotate(0deg)'}
            ], {
                duration:300,
            })
            addPaymentPannelOpenBtnImg.style.transform = 'rotate(0deg)'
            addPaymentForm.animate([
                {opacity: '100%',display: 'block'},
                {opacity: '0%',display: 'none'}
            ], {
                duration:100,
            })
            addPaymentForm.classList.toggle('opened')
        }
    }
})