<?php
$container->set('db', function () {
	$settings = [
        'driver' => 'mysql',
        'host' => 'localhost',
        'database' => 'slim',
        'username' => 'root',
        'password' => '',
        'charset' => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix' => ''
    ];

    $capsule = new Illuminate\Database\Capsule\Manager;
    $capsule->addConnection($settings);
    $capsule->setAsGlobal();
    return $capsule;
});

$container->set('token', function () {
    $key = '16e4362bf6e3ace7baede74d04bef60264416aa7';
    return $key;
});