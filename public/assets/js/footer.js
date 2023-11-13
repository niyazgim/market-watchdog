const footerElem = document.querySelector('footer')

footerElem.innerHTML = `
<div class="footer__content container">
    <div class="footer__container">
        <div class="footer__links">
            <h3>Навигация по сайту</h3>
            <a href="">Тарифы</a>
            <a href="">Почему мы?</a>
            <a href="">Вопрос-ответ</a>
        </div>
        <div class="footer__links">
            <h3>Для пользователей</h3>
            <a href="">Руководство пользователя</a>
            <a href="">Максимальная выгода</a>
        </div>
        <div class="footer__links">
            <h3>О нас</h3>
            <a href="">Кто мы?</a>
            <a href="">Законно ли это?</a>
            <a href="">Информация о копмании</a>
        </div>
        <div class="footer__links">
            <h3>О нас</h3>
            <a href="">Как стать партнёром?</a>
            <a href="">Выгода для партнёров</a>
            <a href="">Польза для Вашего бизнеса</a>
        </div>
        <div class="footer__links">
            <h3>Принимаем</h3>
            <div class="payment-companies-logos_container">
                <img src="assets/img/payment_companies_logo/SBP_logo.svg" alt="" class="payment-company-logo">
                <img src="assets/img/payment_companies_logo/MIR_logo.svg" alt="" class="payment-company-logo">
                <img src="assets/img/payment_companies_logo/Mastercard_logo.svg" alt="" class="payment-company-logo">
                <img src="assets/img/payment_companies_logo/Visa_2021_logo.svg" alt="" class="payment-company-logo">
            </div>
        </div>
    </div>
</div>
`