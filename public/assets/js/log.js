const logForm = document.querySelector('#logForm')

logForm.onsubmit = async (e) => {
    e.preventDefault()
    let user = {
        'email' : logForm.email.value,
        'pass_1' : logForm.pass_1.value,
    }
    const res = await fetch('/logUser',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(user)
    })
    if (!res.ok) {
    }
    if (res.status === 400) {
        const status = await res.json()
        for(let i = status.length - 1; i >= 0; i--) {
            document.querySelector(`#logForm .input__item#${status[i].path} .status-text`).textContent = status[i].msg
        }
    } else if(res.ok){
        window.location.href = "/"
    }
}