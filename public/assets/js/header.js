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
headerElem.insertAdjacentHTML('afterend',`
<div class="burger-menu">
        <nav class="burger-menu__nav">
            <div class="burger-menu__menu">
                <a href="">Тарифы</a>
                <a href="">Почему мы?</a>
                <a href="">Вопрос-ответ</a>
            </div>
            <div class="burger-menu__user-btns">
                <button id="sign-in" class="btn-modal">Войти</a>
                <button id="sign-up" class="btn-modal">Регистрация</a>
            </div>
        </nav>
    </div>`)

document.querySelector('body').insertAdjacentHTML('beforeend',`
<div id="sign-in-modal" class="interactives_modal hidden">
    <div class="modal">
        <div class="modal__header">
            <h1>Вход</h1>
            <button class="close-modal">
                <img src="assets/img/icons/close--white.svg" alt="close_icon">
            </button>
        </div>
        <div class="modal__content">
            <form method="post">
                <div class="input_container">
                    <input type="text" class="form__input" placeholder=" ">
                    <label for="">E-mail</label>
                </div>
                <div class="input_container">
                    <input type="password" class="form__input" placeholder=" ">
                    <label for="">Пароль</label>
                </div>
                <input type="submit" value="Войти">
            </form>
        </div>
    </div>
</div>`)

document.querySelector('body').insertAdjacentHTML('beforeend',`
<div id="sign-up-modal" class="interactives_modal hidden">
    <div class="modal">
        <div class="modal__header">
            <h1>Регистрация</h1>
            <button class="close-modal">
                <img src="assets/img/icons/close--white.svg" alt="close_icon">
            </button>
        </div>
        <div class="modal__content">
            <form method="post">
                <div class="input_container">
                    <input type="text" class="form__input" placeholder=" ">
                    <label for="">E-mail</label>
                </div>
                <div class="input_container">
                    <input type="password" class="form__input" placeholder=" ">
                    <label for="">Пароль</label>
                </div>
                <div class="input_container">
                    <input type="password" class="form__input" placeholder=" ">
                    <label for="">Повторите пароль</label>
                </div>
                <input type="submit" value="Войти">
            </form>
        </div>
    </div>
</div>`)

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