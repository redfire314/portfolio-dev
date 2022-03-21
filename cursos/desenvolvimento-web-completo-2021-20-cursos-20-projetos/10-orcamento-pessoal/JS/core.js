class BancoDados {
    cadastrarDespesa() {
        let despesa = valoreshtml.getValoresFactory()
        despesa.key = key.getProximaKey()

        for(let i in despesa) {
            if(despesa[i] === undefined || despesa[i] === null || despesa[i] === '') {
                alert(`Preencha todos os campos!\nCampo em branco: ${i}`)
                return
            }
        }

        localStorage.setItem(despesa.key, JSON.stringify(despesa))
        console.log('Despesa registrada com sucesso!', despesa)
        key.incrementarKey()
        valoreshtml.limpar()
    }

    getDespesas() {
        let listaDespesa = []
        for(let i = 0; i < key.getProximaKey(); i++) {
            if(localStorage.getItem(i))
                listaDespesa.push(JSON.parse(localStorage.getItem(i)))
        }

        if(listaDespesa.length < 1)
            key.resetarKey()

        return listaDespesa
    }

    removerDespesa(key) {
        console.log('Despesa removida com sucesso!', localStorage.getItem(key))
        localStorage.removeItem(key)
        this.listarDespesas()
    }

    listarDespesas() {
        valoreshtml.atualizarListagem(this.getDespesas())
    }

    filtrarDespesas() {
        let despesas = this.getDespesas()
        let filtro = valoreshtml.getValoresFactory()
        for(let i in filtro) {
            if(filtro[i] === '')
                continue

            despesas = despesas.filter(obj => obj[i] == filtro[i])
        }

        valoreshtml.atualizarListagem(despesas)
    }

    estatistica() {
        let lista = this.getDespesas()
        let objHTML = document.querySelector('#estatistica')
        let gastoTotal = 0

        lista.forEach(obj => gastoTotal += parseFloat(obj.valor))
        objHTML.innerHTML = `Gasto total: R$${gastoTotal}<br>
        Média mensal: R$${(gastoTotal / 12).toFixed(2)}<hr>`

        for(let mes = 1; mes <= 12; mes++) {
            let gastoMes = 0
            lista.forEach(obj => {
                if(obj.mes == mes)
                    gastoMes += parseFloat(obj.valor)
            })

            if(gastoMes == 0)
                continue
            
            objHTML.innerHTML += `Gasto em ${numToMes(mes)}: R$${gastoMes.toFixed(2)}<br>`
        }
    }
}

class Key {
    primeiraKey() {
        if(localStorage.getItem('ID'))
            return
        
        localStorage.setItem('ID', -1)
    }
    
    getProximaKey() {
        return parseInt(localStorage.getItem('ID')) + 1
    }
    
    incrementarKey() {
        localStorage.setItem('ID', this.getProximaKey())
    }

    resetarKey() {
        localStorage.setItem('ID', -1)
    }
}

class ValoresHTML {
    getValoresFactory() {
        return {
            ano: document.querySelector('#ano').value,
            mes: document.querySelector('#mes').value,
            dia: document.querySelector('#dia').value,
            tipo: document.querySelector('#tipo').value,
            descricao: document.querySelector('#descricao').value,
            valor: document.querySelector('#valor').value 
        }
    }
    
    limpar() {
        document.querySelector('#ano').value = ''
        document.querySelector('#mes').value = ''
        document.querySelector('#dia').value = ''
        document.querySelector('#tipo').value = ''
        document.querySelector('#descricao').value = ''
        document.querySelector('#valor').value = ''
    }

    atualizarListagem(lista) {
        lista.forEach(item => {
            let row = document.querySelector('#listagem').insertRow()
            row.insertCell().innerHTML = `${item.dia}/${item.mes}/${item.ano}`
            row.insertCell().innerHTML = `${item.tipo}`
            row.insertCell().innerHTML = `${item.descricao}`
            row.insertCell().innerHTML = `${item.valor}`
            row.insertCell().innerHTML = `<i class="fas fa-times" style="color: red" onclick="bd.removerDespesa(${item.key})"></i>`
        })
    }
}

function numToMes(num) {
    switch(parseInt(num)) {
        case 1:
            return 'Janeiro'
        case 2:
            return 'Fevereiro'
        case 3:
            return 'Março'
        case 4:
            return 'Abril'
        case 5:
            return 'Maio'
        case 6:
            return 'Junho'
        case 7:
            return 'Julho'
        case 8:
            return 'Agosto'
        case 9:
            return 'Setembro'
        case 10:
            return 'Outubro'
        case 11:
            return 'Novembro'
        case 12:
            return 'Dezembro'
        default:
            return 'Desconhecido'
    }
}

let bd = new BancoDados()
let key = new Key()
let valoreshtml = new ValoresHTML()