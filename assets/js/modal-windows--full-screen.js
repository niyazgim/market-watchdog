const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.onclick = () => {
        document.body.style.overflow = "hidden"
        const currentModalWindow = document.querySelector(`#${e.id}-modal`)
        currentModalWindow.classList.toggle('hidden')
        currentModalWindow.querySelector('.close-modal').onclick = () => {
            currentModalWindow.classList.toggle('hidden')
            document.body.style.overflow = ""
        }
    }
})