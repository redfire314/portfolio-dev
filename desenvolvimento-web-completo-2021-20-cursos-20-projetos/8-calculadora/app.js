class Calculadora {
    calcular() {
        s = true
        try {
            d.atualizar(eval(d.getInput()))
        } catch {
            d.atualizar('Operação inválida!')
        }
    }
}

class Display {
    getInput() {
        return document.querySelector('#feedback').value
    }

    escrever(num) {
        if(s) this.limpar()

        let display = [...this.getInput()]
        if(display.length == 1 && num == 0)
            return
        if(display[display.length - 1] == '.' && num == '.')
            return

        document.querySelector('#feedback').value += num
    }

    atualizar(num) {
        document.querySelector('#feedback').value = num
    }

    limpar() {
        s = false
        document.querySelector('#feedback').value = ''
    }
}

let d = new Display()
let c = new Calculadora()
let s = false