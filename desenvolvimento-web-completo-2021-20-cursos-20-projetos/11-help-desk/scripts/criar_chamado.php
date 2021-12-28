<?php
    session_start();
    $divisor = '—';
    $chamados = fopen('../chamados/chamados.hd', 'a');
    $chamado = $_SESSION['id'].$divisor.implode($divisor, $_POST).PHP_EOL;
    fwrite($chamados, $chamado);
    fclose($chamados);
    header('Location: ../abrir_chamado.php');
?>