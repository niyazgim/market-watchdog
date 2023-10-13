function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

function checkAllFields(form) {
    for(const el of form.elements) {
        if(el.type !== 'submit' && (el.value.length == 0 || form.querySelector('#'+ form.getAttribute('id') + '__' + el.name + '-err').textContent.length > 0 || el.classList.contains('invalid'))) {
            return false
        }
    }
    return true
}

function isSizeValid(min = 0, max, input) {
    inputLen = input.value.length
    if (inputLen < min) {
        return 'less'
    } else if (inputLen > max) {
        return 'bigger'
    } else if (inputLen >= min && inputLen <= max) {
        return true
    }
}

function getStyles(elem) {
	return window.getComputedStyle(elem, null);
}

function getParent(el){ 
    if (el.parentElement){
        return el.parentElement;
    }

    if (el.parentNode){
        return el.parentNode;
    }

    return null;
}

function checkClick(target, userInteractivesBtns) {
    let isModalClick = false;

    userInteractivesBtns.forEach((el) => {
        const userModal = el.parentElement.parentElement.querySelector('.user__modal');
        
        if (target === el || target === el.querySelector('img') || target === userModal || userModal.contains(target)) {
            isModalClick = true;
        }
    });
    return isModalClick;
}