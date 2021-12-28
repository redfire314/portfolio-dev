$(document).ready(() => {
	$('#doc').on('click', () => {
        $.ajax({
            type: 'GET',
            url: 'documentacao.html',
            success: data => { $('#pagina').html(data) },
            error: error => { console.log(error) }
        })
    })

    $('#sup').on('click', () => {
        $.ajax({
            type: 'GET',
            url: 'suporte.html',
            success: data => { $('#pagina').html(data) },
            error: error => { console.log(error) }
        })
    })

    $('#comp').on('change', e => {
        $.ajax({
            type: 'GET',
            url: 'app.php',
            data: `competencia=${$(e.target).val()}`, // x-www-form-urlencoded
            dataType: 'json',
            success: data => {
                $('#numVenda').html(data.numVenda);
                $('#totalVenda').html(data.totalVenda);
            },
            error: error => console.log(error)
        })
    })
})