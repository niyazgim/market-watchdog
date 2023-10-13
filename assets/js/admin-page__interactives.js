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
    }
})

function checkClick(target, userInteractivesBtns) {
    let isModalClick = false;

    userInteractivesBtns.forEach((el) => {
        const userModal = el.parentElement.parentElement.querySelector('.user__modal');
        
        if (target === el || target === el.querySelector('img') || target === userModal || userModal.contains(target)) {
            isModalClick = true;
        }
    });
    return isModalClick;
}
document.onclick = (e) => {
    let target = e.target;
    if (!checkClick(target, userInteractivesBtns) && isUserModalOpened === 1) {
        userInteractivesBtns.forEach((el) => {
            if (el.style.transform === 'rotate(-90deg)') {
            const userModal = el.parentElement.parentElement.querySelector('.user__modal');
            
            el.animate(
                [{ transform: 'rotate(-90deg)' }, { transform: 'rotate(0deg)' }],
                { duration: 150 }
            );
            
            el.style.transform = 'rotate(0deg)';
            userModal.classList.toggle('hidden');
            }
        });
    }
};
