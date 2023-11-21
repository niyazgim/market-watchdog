let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
};



let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting) {
            return;
        }
        banner_modal.classList.toggle('opened')
        observer.unobserve(entry.target);
    });
}, options);

let target = document.querySelector("#faq");
let banner_modal = document.querySelector('.banner_modal')
let banner_close = document.querySelector('.banner__close')
banner_close.onclick = () => {
    banner_modal.classList.toggle('opened')
}
observer.observe(target);