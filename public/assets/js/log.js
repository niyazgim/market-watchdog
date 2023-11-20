const logForm = document.querySelector('#logForm')

logForm.onsubmit = async (e) => {
    e.preventDefault()
    let user = {
        'email' : logForm.email.value,
        'password' : logForm.pass_1.value,
    }
    const res = await fetch('/logUser',{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(user)
    })
    if (!res.ok) {
        console.log("Error trying to log in");
        throw res;
    }
    if (res.status === 400) {
        const status = await res.json()
        return status;
    } else if(res.ok){
        window.location.href = "/"
    }
}