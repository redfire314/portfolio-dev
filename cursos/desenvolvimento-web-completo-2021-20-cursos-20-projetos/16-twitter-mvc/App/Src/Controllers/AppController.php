<?php
    namespace App\Src\Controllers;

    use App\Src\Models\Tweet;
    use App\Src\Models\Usuarios;

class AppController {
        public function timeline() {
            $usuario = new Usuarios();
            $usuario->getStatus();
            require_once '../App/Src/Views/timeline.phtml';
        }

        public function sair() {
            session_start();
            session_destroy();
            header('Location: /');
        }

        public function tweet() {
            $tweet = new Tweet();
            $tweet->criarTweet();
        }

        public function removetweet() {
            $tweet = new Tweet();
            $tweet->removerTweet();
        }

        public function quemseguir() {
            session_start();
            $usuario = new Usuarios();
            require_once '../App/Src/Views/quemSeguir.phtml';
        }

        public function follow() {
            $usuario = new Usuarios();
            $usuario->follow();
        }

        public function unfollow() {
            $usuario = new Usuarios();
            $usuario->unfollow();
        }
    }