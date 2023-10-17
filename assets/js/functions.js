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

function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
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