const headerElem = document.querySelector('header')

headerElem.innerHTML = `
<div class="header__content container">
    <a href="index.html">
        <img src="assets/img/logo/logo.svg" alt="logo" class="header__logo">
    </a>
    <nav class="header__nav">
        <div class="header__menu">
            <a href="">Тарифы</a>
            <a href="">Почему мы?</a>
            <a href="">Вопрос-ответ</a>
        </div>
        <div class="header__user-btns">
            <button id="sign-in" class="btn-modal">Войти</a>
            <button id="sign-up" class="btn-modal">Регистрация</a>
        </div>
    </nav>
    <button class="burger-menu__btn">
        <img src="assets/img/icons/menu.svg" alt="burger-menu_icon">
        <!-- <div class="line" id="bl1"></div>
        <div class="line" id="bl2"></div>
        <div class="line" id="bl3"></div> -->
    </button>
</div>
`

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