let acertos = 0
let erros = 0
let total = 0
let precisao = 0

function compareText() {
    let writtenText = $('#textarea1').val()
    let correctText = $('#correct-text').text()

    writtenText = writtenText.split(' ')
    correctText = correctText.split(' ')
    
    const QT_WORD_DIFF = Math.abs(correctText.length - writtenText.length)

    correctText.forEach((value, key) => {
        if (value == writtenText[key]) {
            acertos++
        } else {
            if (QT_WORD_DIFF > 0) {
                for (let i = 1; i <= QT_WORD_DIFF; i++) {
                    if (writtenText[key - i] && value == writtenText[key - i]) {
                        acertos++
                        break
                    } else if (i == QT_WORD_DIFF) {
                        erros++
                        correctText[key] = '<span class="wrong">' + value + '</span>'
                    }
                }
            } else {
                erros++
                correctText[key] = '<span class="wrong">' + value + '</span>'
            }
        }
    })
    
    total = correctText.length
    precisao = (acertos * 100) / total

    updateStatistics(correctText.join(' '))
    resetStatistics()
}

function toggleText() {
    $('#correct-text').toggleClass('hide-text')
}

function updateStatistics(text) {
    console.log('Total: ' + total, ' | Acertos: ' + acertos, ' | Erros: ' + erros, ' | Precisão: ' + precisao.toFixed(2) + '%')
    $('#correct-text').html(text)
}

function resetStatistics() {
    acertos = 0
    erros = 0
    total = 0
    precisao = 0
}

function setSelection() {
    if (window.location.pathname == '/' || window.location.pathname == '/texto') {
        let params = new URLSearchParams(window.location.search.substring(1))
        let text = params.get('text')
        let element = document.querySelector(`option[value=${text}]`)
        element.setAttribute('selected', 'selected')
    }
}

$(() => {
    $('.prevent').click(e => {
        e.preventDefault()
    })

    $('.sidenav').sidenav()

    $('input.autocomplete').autocomplete({
        data
    })

})

setSelection()