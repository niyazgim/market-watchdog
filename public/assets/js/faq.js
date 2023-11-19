const faqBtns = document.querySelectorAll('.faq__item')

faqBtns.forEach((e)=>{
    let faqStartHeight = e.offsetHeight + Number((getComputedStyle(e).borderTopWidth).slice(0,-2))
    window.addEventListener('resize',function(){
        faqStartHeight =  Number((getComputedStyle(e.querySelector('.faq__question-btn')).height).slice(0,-2)) + Number((getComputedStyle(e).borderTopWidth).slice(0,-2)) + Number((getComputedStyle(e).paddingBottom).slice(0,-2))
        if(e.classList.contains('closed')) {
            e.style.height = faqStartHeight + 'px'
        }
        else {
            
            e.style.height = faqStartHeight + + Number((getComputedStyle(e.querySelector('.faq__answer')).height).slice(0,-2)) + Number((getComputedStyle(e.querySelector('.faq__answer')).marginTop).slice(0,-2)) + 'px'
        }
    });
    
    e.onclick = () => {
        const faqOpenedHeight = faqStartHeight + Number((getComputedStyle(e.querySelector('.faq__answer')).height).slice(0,-2)) + Number((getComputedStyle(e.querySelector('.faq__answer')).marginTop).slice(0,-2))
        const topPos = Number((getComputedStyle(e.querySelector('.faq__question-btn')).height).slice(0,-2)) + Number((getComputedStyle(e).paddingTop).slice(0,-2))
        const topPosStart = Number((getComputedStyle(e.querySelector('.faq__answer')).height).slice(0,-2))
        if(e.classList.contains('closed')) {
            e.querySelector('.faq__icon').animate([
                {transform: 'rotate(0deg)'},
                {transform: 'rotate(90deg)'}
            ], {
                duration:200,
            })
            e.querySelector('.faq__icon').style.transform = 'rotate(90deg)'
            e.animate([
                {height: `${faqStartHeight}px`},
                {height: `${faqOpenedHeight}px`}
            ], {
                duration:250,
            })
            e.querySelector('.faq__answer').animate([
                {top: `-${topPosStart}px`,opacity: '0%'},
                {top: `${topPos}px`,opacity: '100%'}
            ], {
                duration:250,
            })
            e.querySelector('.faq__answer').style.top = `${topPos}px`
            e.querySelector('.faq__answer').style.opacity = '100%'
            e.style.height = faqOpenedHeight + 'px'
        }
        else {
            e.querySelector('.faq__icon').animate([ 
                {transform: 'rotate(90deg)'},
                {transform: 'rotate(0deg)'}
            ], {
                duration:200,
            })
            e.querySelector('.faq__icon').style.transform = 'rotate(0deg)'
            e.animate([
                {height: `${faqOpenedHeight}px`},
                {height: `${faqStartHeight}px`}
            ], {
                duration:250,
            })
            e.querySelector('.faq__answer').animate([
                {top: `${topPos}px`,opacity: '100%'},
                {top: `-${topPosStart}px`,opacity: '0%'}
            ], {
                duration:250,
            })
            e.querySelector('.faq__answer').style.top = '0px'
            e.querySelector('.faq__answer').style.opacity = '0%'
            e.style.height = faqStartHeight + 'px'
        }
        e.classList.toggle('closed')
    }
})