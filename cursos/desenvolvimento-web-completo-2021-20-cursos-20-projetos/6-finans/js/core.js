function barMenu() {
    let nav = document.querySelector`header > nav ul`
    let barMenu = document.querySelector`#bars-menu`

    if(nav.className == 'collapsed') {
        nav.classList = 'expanded'
        barMenu.classList = 'fas fa-times btn'
        barMenu.style.color = 'wheat'
        barMenu.style.border = '1px solid wheat'
    } else {
        nav.classList = 'collapsed'
        barMenu.classList = 'fas fa-bars btn'
        barMenu.style.color = 'white'
        barMenu.style.border = '1px solid white'
    }
}

function inverterOrdem() {
    let artImg = document.querySelectorAll`main article img`
    let inv = false
    artImg.forEach(img => {
        if(inv) {
            img.classList = 'foo'
            inv = false
        } else
            inv = true
    })
}