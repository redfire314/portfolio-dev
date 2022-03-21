<?php
    session_start();

    # Temp
    $valid_users = [
        ['id' => 1, 'email' => 'abc@adm.com', 'password' => '123456', 'access' => 'adm'],
        ['id' => 2, 'email' => 'qwe@user.com', 'password' => '123456', 'access' => 'user'],
        ['id' => 3, 'email' => 'zxc@user.com', 'password' => '123456', 'access' => 'user']
    ];

    foreach ($valid_users as $user) {
        if($user['email'] == $_POST['email'] && $user['password'] == $_POST['password']) {
            $_SESSION['login'] = 'ok';
            $_SESSION['id'] = $user['id'];
            $_SESSION['access'] = $user['access'];
            header('Location: ../home.php');
            break;
        } else {
            $_SESSION['login'] = 'fail';
        }
    }

    if($_SESSION['login'] == 'fail')
        header('Location: ../index.php');
?>