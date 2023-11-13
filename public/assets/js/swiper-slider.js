if(document.querySelector('.swiper')) {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: false,
        initialSlide: 1,
        slidesPerView: 1.25,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
