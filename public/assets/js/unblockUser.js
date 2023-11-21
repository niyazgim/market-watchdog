const unblockUserBtns = document.querySelectorAll('.user__modal-item.unblock-user')

unblockUserBtns.forEach((e) => {
    e.onclick = async () => {
        let user = {
            '_id' : e.parentElement.parentElement.dataset.uid,
        }
        const res = await fetch('/unblockUser',{
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
            return status
        } else if(res.ok){
            window.location.href = "/admin"
        }
    }
})
