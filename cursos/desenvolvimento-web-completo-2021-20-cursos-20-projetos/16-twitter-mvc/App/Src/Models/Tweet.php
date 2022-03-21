<?php
    namespace App\Src\Models;

    class Tweet extends Model {
        private $id;
        private $id_usuario;
        private $tweet;
        private $data_criacao;

        public function __construct() {
            $this->initCon();
        }

        public function criarTweet() {
            session_start();
            $stmt = $this->conn->prepare('insert into tweets (tweet, id_usuario) values (:tweet, :id_usuario)');
            $stmt->execute([
                ':tweet' => $_POST['tweet'],
                ':id_usuario' => $_SESSION['id']
            ]);

            header('Location: /timeline/?tweet=success');
        }

        public function removerTweet() {
            if(!isset($_POST['id']))
                return false;

            $stmt = $this->conn->prepare('delete from tweets where id = :id');
            $stmt->execute([':id' => base64_decode($_POST['id'])]);
            header('Location: /timeline');
        }
    }