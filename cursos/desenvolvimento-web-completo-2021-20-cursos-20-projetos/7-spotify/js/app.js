function displayNav() {
    let nav = document.querySelector`body > header > nav`
    if(nav.className == 'collapse') {
        nav.classList = 'expand'
        document.querySelector`#bars`.classList = 'fas fa-times btn-border'
    } else {
        nav.classList = 'collapse'
        document.querySelector`#bars`.classList = 'fas fa-bars btn-border'
    }
}

function carouselHorse(x) {
    let slider = document.querySelector`.carousel-slider`
    slider.style.animationPlayState = 'paused'
    setTimeout(() => {
        slider.style.animationPlayState = 'running'
    }, 3000)
}