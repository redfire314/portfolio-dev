<?php
    session_start();
?>

<html>
	<head>
		<meta charset="utf-8" />
    	<title>App Mail Send</title>
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	</head>
	<body>
		<div class="container">  
			<div class="py-3 text-center">
				<img class="d-block mx-auto mb-2" src="logo.png" alt="" width="72" height="72">
				<h2>Send Mail</h2>
				<p class="lead">Seu app de envio de e-mails particular!</p>
			</div>
      		<div class="row">
      			<div class="col-md-12">
					<?php if(isset($_SESSION['status']) && $_SESSION['status'] == 'success') { ?>
						<div class="text-success" style="text-align: center;">Email enviado com sucesso!</div>
					<?php } else if(isset($_SESSION['status']) && $_SESSION['status'] == 'fail') { ?>
						<div class="text-danger" style="text-align: center;">Email não enviado!</div>
					<?php } else if(isset($_SESSION['status']) && $_SESSION['status'] == 'fail-2') { ?>
						<div class="text-danger" style="text-align: center;">Campos inválidos!</div>
					<?php } session_unset(); ?>
					<div class="card-body font-weight-bold">
						<form action="validation.php" method="POST">
							<div class="form-group">
								<label for="para">Para</label>
								<input  name="destinatario" type="email" class="form-control" id="para" placeholder="joao@dominio.com.br">
							</div>
							<div class="form-group">
								<label for="assunto">Assunto</label>
								<input name="assunto" type="text" class="form-control" id="assunto" placeholder="Assundo do e-mail">
							</div>
							<div class="form-group">
								<label for="mensagem">Mensagem</label>
								<textarea name="mensagem" class="form-control" id="mensagem"></textarea>
							</div>
							<button type="submit" class="btn btn-primary btn-lg">Enviar Mensagem</button>
						</form>
					</div>
				</div>
      		</div>
      	</div>
	</body>
</html>