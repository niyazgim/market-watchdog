const burgerMenuBtn = document.querySelector('.burger-menu__btn')
const burgerMenu = document.querySelector('.burger-menu')

burgerMenuBtn.onclick = () => {
    if(!burgerMenu.classList.contains('opened')) {
        burgerMenu.style.display = 'block'
        burgerMenu.animate([
            {right: '-100%'},
            {right:0}
        ],
            {
                duration: 150,
            }
        )
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = getScrollbarWidth() + 'px'
    }
    else {
        burgerMenu.animate([
            {right:0},
            {right: '-100%'}
        ],
            {
                duration: 150,
            }
        )
        setTimeout(()=>{
            burgerMenu.style.display = 'none'
            document.body.style.overflow = ""
            document.body.style.paddingRight = 0
        },130)
    }
    burgerMenu.classList.toggle('opened')
}