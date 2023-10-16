function include(url) {
    let script = document.createElement('script')
    script.src = url
    script.defer = true
    document.getElementsByTagName('head')[0].appendChild(script)
}
// function getFileNameFromUrl(url) {
    //     return decodeURI(url.split('/').pop());
    // }
    function getLastElementFromUrl(url) {
        const urlWithoutQuery = url.split('?')[0];
        
        const segments = urlWithoutQuery.split('/');
        
    const filteredSegments = segments.filter(segment => segment !== '');
    
    const lastElement = filteredSegments[filteredSegments.length - 1];
    
    return lastElement;
}

include('assets/js/header.js')

include('assets/js/functions.js')
include('assets/js/modal-windows--full-screen.js')
include('assets/js/faq.js')
include('assets/js/payments-interactives.js')

switch(getLastElementFromUrl(window.location.href)) {
    case('admin.html'):
        include('assets/js/admin-page__interactives.js')
        break
}
