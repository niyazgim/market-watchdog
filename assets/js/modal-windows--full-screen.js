const modalWindowsBtns = document.querySelectorAll('.btn-modal')

modalWindowsBtns.forEach((e) => {
    e.onclick = () => {
        const currentModalWindow = document.querySelector(`#${e.id}-modal`)
        currentModalWindow.classList.toggle('hidden')
        currentModalWindow.querySelector('.close-modal').onclick = () => {
            currentModalWindow.classList.toggle('hidden')
        }
    }
})