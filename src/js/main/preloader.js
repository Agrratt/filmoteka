function preloader() {
    // return  window.onload = function () {
    // document.body.classList.add('loaded_hiding');
    // window.setTimeout(function () {
    // document.body.classList.add('loaded');
    // document.body.classList.remove('loaded_hiding');
    // }, 500);
    // }
    return `<div class="refreshing-loader-wrapper close-spinner">
    <div class="refreshing-loader"> </div>
    </div>`

    // const spinnerRef = document.querySelector('.refreshing-loader-wrapper')
    // spinnerRef.classList.toggle("close-spinner")
    
}

export default preloader;