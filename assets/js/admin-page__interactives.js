const userInteractivesBtns = document.querySelectorAll('.user__interactives_btn')
isUserModalOpened = 0

userInteractivesBtns.forEach((e)=>{
    e.onclick = () => {
        const userInteractivesBtn = e.parentElement.parentElement.querySelector('.user__modal')
        if(userInteractivesBtn.classList.contains('hidden')) {
            userInteractivesBtns.forEach((el)=>{
                if(el.getAttribute('style') == 'transform: rotate(-90deg);') {
                    el.animate([
                        {transform: 'rotate(-90deg)'},
                        {transform: 'rotate(0deg)'}
                    ], {
                        duration:150,
                    })
                    el.style.transform = 'rotate(0deg)'
                    el.parentElement.parentElement.querySelector('.user__modal').classList.toggle('hidden')
                }
            })
            e.animate([
                {transform: 'rotate(0deg)'},
                {transform: 'rotate(-90deg)'}
            ], {
                duration:150,
            })
            e.style.transform = 'rotate(-90deg)'
            userInteractivesBtn.classList.toggle('hidden')
            isUserModalOpened = 1
        }
        else {
            e.animate([
                {transform: 'rotate(-90deg)'},
                {transform: 'rotate(0deg)'}
            ], {
                duration:150,
            })
            e.style.transform = 'rotate(0deg)'
            userInteractivesBtn.classList.toggle('hidden')
            isUserModalOpened = 0
        }
        //console.log(isUserModalOpened)
    }
})
// to-do FIX
document.onclick = (e)=> {
    let isClickedAround
    let target = e.target
    console.log(target)
    userInteractivesBtns.forEach((el)=>{
        isClickedAround = 1
        const userModal = el.parentElement.parentElement.querySelector('.user__modal')
        if(isUserModalOpened == 1 && (target == el || el.querySelector('img') || target == userModal || target == userModal.querySelector('span') || target == userModal.querySelector('img'))) {
            isClickedAround = 0
        }
    })
    console.log(isClickedAround)
    if(isClickedAround == 1) {
        userInteractivesBtns.forEach((el)=>{
            if(el.getAttribute('style') == 'transform: rotate(-90deg);') {
                el.animate([
                    {transform: 'rotate(-90deg)'},
                    {transform: 'rotate(0deg)'}
                ], {
                    duration:150,
                })
                el.style.transform = 'rotate(0deg)'
                el.parentElement.parentElement.querySelector('.user__modal').classList.toggle('hidden')
            }
        })
    }
}