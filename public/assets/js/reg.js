const regForm = document.querySelector('#regForm')

regForm.onsubmit = async (e) => {
    e.preventDefault()
    let user = {
        'email' : regForm.email.value,
        'pass_1' : regForm.pass_1.value,
        'pass_2' : regForm.pass_2.value,
    }
    const res = await fetch('/regUser',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(user)
    })
    if (!res.ok) {
        // console.log("Error trying to reg user");
        // throw res;
    }
    if (res.status === 400) {
        const status = await res.json()
        for(let i = status['errors'].length - 1; i >= 0; i--) {
            document.querySelector(`#regForm .input__item#${status['errors'][i].path} .status-text`).textContent = status['errors'][i].msg
        }
    } else if(res.ok){
        window.location.href = "/"
    }
}