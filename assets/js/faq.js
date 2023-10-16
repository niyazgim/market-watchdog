const faqBtns = document.querySelectorAll('.faq__btn')

faqBtns.forEach((e)=>{
    const faqContainer = e.parentElement.parentElement
    e.onclick = () => {
        if(faqContainer.classList.contains('closed')) {
            e.querySelector('img').animate([
                {transform: 'rotate(0deg)'},
                {transform: 'rotate(90deg)'}
            ], {
                duration:200,
            })
            e.querySelector('img').style.transform = 'rotate(90deg)'
            faqContainer.querySelector('.faq__answer').animate([
                {top: '0px',opacity: '0%'},
                {top: '50px',opacity: '100%'}
            ], {
                duration:200,
            })
            faqContainer.querySelector('.faq__answer').style.top = '50px'
            faqContainer.querySelector('.faq__answer').style.opacity = '100%'
            faqContainer.style.height = (63 + Number((getStyles(faqContainer.querySelector('.faq__answer')).height).slice(0,-2))) + 'px'
        }
        else {
            e.querySelector('img').animate([
                {transform: 'rotate(90deg)'},
                {transform: 'rotate(0deg)'}
            ], {
                duration:200,
            })
            e.querySelector('img').style.transform = 'rotate(0deg)'
            faqContainer.querySelector('.faq__answer').animate([
                {top: '50px',opacity: '100%'},
                {top: '0px',opacity: '0%'}
            ], {
                duration:200,
            })
            faqContainer.querySelector('.faq__answer').style.top = '0px'
            faqContainer.querySelector('.faq__answer').style.opacity = '0%'
            faqContainer.style.height = 63 + 'px'
        }
        faqContainer.classList.toggle('closed')
    }
})