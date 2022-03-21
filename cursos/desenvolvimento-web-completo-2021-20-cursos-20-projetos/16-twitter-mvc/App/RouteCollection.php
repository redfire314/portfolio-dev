<?php
    namespace App;

    abstract class RouteCollection {

        // TODO: Colocar atributo se é protegido ou não. Ex.:
        protected $routes = [
            'home' => [
                'URI' => '',
                'Controller' => 'IndexController',
                'Action' => 'index'
                //'Protected' => 'true' # Impede que seja acessado sem estar logado ( session_start(); )
            ],

            'inscreverse' => [
                'URI' => 'inscreverse',
                'Controller' => 'IndexController',
                'Action' => 'inscreverse'
            ],

            'registrar' => [
                'URI' => 'registrar',
                'Controller' => 'AuthController',
                'Action' => 'registrar'
            ],

            'login' => [
                'URI' => 'login',
                'Controller' => 'AuthController',
                'Action' => 'login'
            ],

            'timeline' => [
                'URI' => 'timeline',
                'Controller' => 'AppController',
                'Action' => 'timeline'
            ],

            'sair' => [
                'URI' => 'sair',
                'Controller' => 'AppController',
                'Action' => 'sair'
            ],

            'tweet' => [
                'URI' => 'tweet',
                'Controller' => 'AppController',
                'Action' => 'tweet'
            ],

            'removetweet' => [
                'URI' => 'removetweet',
                'Controller' => 'AppController',
                'Action' => 'removetweet'
            ],

            'quemseguir' => [
                'URI' => 'quemseguir',
                'Controller' => 'AppController',
                'Action' => 'quemseguir'
            ],

            'follow' => [
                'URI' => 'follow',
                'Controller' => 'AppController',
                'Action' => 'follow'
            ],

            'unfollow' => [
                'URI' => 'unfollow',
                'Controller' => 'AppController',
                'Action' => 'unfollow'
            ]
        ];
    }
?>