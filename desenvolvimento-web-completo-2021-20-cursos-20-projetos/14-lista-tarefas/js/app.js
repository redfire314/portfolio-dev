function newTask() {
    let value = document.querySelector('#task').value
    document.querySelector('#task').value = ''
    if(value == '')
        return false

    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'task_manager.php', true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr)
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send(`action=newTask&task=${value}`)
}

function listTask(isTodo) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'task_manager.php', true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let row = xhr.responseText.split('\n')
            row.forEach(item => {
                if(item == '')
                    return false

                let json = JSON.parse(item)

                let container = document.querySelector('#task-placeholder')
                let divC = document.createElement('div')
                divC.classList = 'row mb-3 d-flex align-items-center tarefa'
                let divT = document.createElement('div')
                divT.classList = 'col-sm-9'
                divT.innerHTML = `${json.tarefa} (${json.status})`
                let divI = document.createElement('div')
                divI.classList = 'col-sm-3 mt-2 d-flex justify-content-around'
                let icon1 = document.createElement('i')
                icon1.classList = 'fas fa-trash-alt fa-lg text-danger'
                icon1.setAttribute('onclick', `removeTask(${json.id})`)

                divI.appendChild(icon1)
                divC.appendChild(divT)
                divC.appendChild(divI)
                container.appendChild(divC)

                if(json.status == 'pendente') {
                    let icon3 = document.createElement('i')
                    icon3.classList = 'fas fa-check-square fa-lg text-success'
                    icon3.setAttribute('onclick', `setDone(${json.id})`)
                    divI.appendChild(icon3)
                }
            })
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send('action=listTask&isTodo=' + isTodo)
}

function removeTask(id) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'task_manager.php', true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr)
            location.reload()
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send('action=removeTask&id=' + id)
}

function setDone(id) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'task_manager.php', true)
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr)
            location.reload()
        }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    xhr.send('action=setDone&id=' + id)
}