const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.onclick = () => {
        document.body.style.overflow = "hidden"
        document.body.style.paddingRight = getScrollbarWidth() + 'px'
        const currentModalWindow = document.querySelector(`#${e.id}-modal`)
        currentModalWindow.classList.toggle('hidden')
        currentModalWindow.querySelector('.close-modal').onclick = () => {
            currentModalWindow.classList.toggle('hidden')
            document.body.style.overflow = ""
            document.body.style.paddingRight = 0
        }
    }
})