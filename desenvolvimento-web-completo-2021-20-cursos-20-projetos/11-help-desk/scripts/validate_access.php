<?php
    session_start();
    
    if(!isset($_SESSION['login']) || $_SESSION['login'] == 'fail')
        header('Location: ../index.php');
?>