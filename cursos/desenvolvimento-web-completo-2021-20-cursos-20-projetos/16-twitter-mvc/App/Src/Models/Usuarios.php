<?php
    namespace App\Src\Models;

    class Usuarios extends Model {
        private $id;
        private $nome;
        private $email;
        
        public function __construct() {
            $this->initCon();
        }

        public function __get($attr) {
            return $this->$attr;
        }

        public function __set($attr, $value) {
            $this->$attr = $value;
        }

        private function isExistente() {
            $stmt = $this->conn->prepare("select count(*) as total from usuarios where email = :email");
            $stmt->execute([':email' => $_POST['email']]);
            $stmt = $stmt->fetch(\PDO::FETCH_ASSOC);

            if($stmt['total'] == 0)
                return false;
            else
                return true;
        }
        
        public function cadastrar() {
            if(!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['password']) || !$this->isExistente()) {
                $stmt = $this->conn->prepare('insert into usuarios (nome, email, senha) values (:nome, :email, :senha)');
                $stmt->execute([
                    ':nome' => $_POST['name'],
                    ':email' => $_POST['email'],
                    ':senha' => md5($_POST['password'])
                ]);

                $this->getUser();
            } else
                header('Location: /inscreverse/?error');
        }

        public function getUser() {
            if(!isset($_POST['email']) || !isset($_POST['password']))
                return false;
            
            $stmt = $this->conn->prepare('select id, nome, email from usuarios where email = :email and senha = :senha');
            $stmt->execute([
                ':email' => $_POST['email'],
                ':senha' => md5($_POST['password'])
            ]);

            $stmt = $stmt->fetch(\PDO::FETCH_ASSOC);
            $this->__set('id', $stmt['id']);
            $this->__set('nome', $stmt['nome']);
            $this->__set('email', $stmt['email']);

            if($this->__get('id')) {
                session_start();
                $_SESSION['id'] = $this->__get('id');
                $_SESSION['nome'] = $this->__get('nome');

                header('Location: /timeline');
            } else
                header('Location: /?login=error');
        }

        public function getStatus() {
            session_start();
            $this->getTotalTweets();
            $this->getTotalFollowers();
            $this->getTotalFollows();
        }

        private function getTotalTweets() {
            $stmt = $this->conn->prepare('SELECT COUNT(*) AS total FROM tweets WHERE id_usuario = :id');
            $stmt->execute([':id' => $_SESSION['id']]);
            $stmt = $stmt->fetch(\PDO::FETCH_ASSOC);
            $_SESSION['totalTweets'] = $stmt['total'];
        }

        private function getTotalFollowers() {
            $stmt = $this->conn->prepare('SELECT COUNT(*) AS total FROM seguidores WHERE id_seguido = :id');
            $stmt->execute([':id' => $_SESSION['id']]);
            $stmt = $stmt->fetch(\PDO::FETCH_ASSOC);
            $_SESSION['totalFollowers'] = $stmt['total'];
        }

        private function getTotalFollows() {
            $stmt = $this->conn->prepare('SELECT COUNT(*) AS total FROM seguidores WHERE id_usuario = :id');
            $stmt->execute([':id' => $_SESSION['id']]);
            $stmt = $stmt->fetch(\PDO::FETCH_ASSOC);
            $_SESSION['totalFollows'] = $stmt['total'];
        }

        public function getAllTweets() {
            $stmt = $this->conn->prepare("SELECT t.id, t.tweet, t.id_usuario, u.nome, DATE_FORMAT(t.data_criacao, '%d/%m/%Y %H:%i') AS data FROM tweets AS t LEFT JOIN usuarios AS u ON t.id_usuario = u.id WHERE u.id = :id OR u.id IN (SELECT id_seguido FROM seguidores WHERE id_usuario = :id) ORDER BY data DESC");
            $stmt->execute([':id' => $_SESSION['id']]);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        public function procurarUsuarios() {
            $stmt = $this->conn->prepare('SELECT u.id, u.nome, s.id_usuario FROM usuarios AS u LEFT JOIN seguidores AS s ON u.id = s.id_seguido WHERE u.nome LIKE :nome');
            $stmt->execute([':nome' => '%'.$_POST['nome'].'%']);
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        public function follow() {
            session_start();
            $nome = str_replace('/follow/', '', $_SERVER['REQUEST_URI']);
            $stmt = $this->conn->prepare('INSERT INTO seguidores (id_usuario, id_seguido) VALUES (:id, (SELECT id FROM usuarios WHERE nome = :nome))');
            $stmt->execute([
                ':id' => $_SESSION['id'],
                ':nome' => $nome
            ]);

            header('Location: /quemseguir');
        }

        public function unfollow() {
            session_start();
            $nome = str_replace('/unfollow/', '', $_SERVER['REQUEST_URI']);
            $stmt = $this->conn->prepare('DELETE FROM seguidores WHERE id_usuario = :id AND id_seguido = (SELECT id FROM usuarios WHERE nome = :nome)');
            $stmt->execute([
                ':id' => $_SESSION['id'],
                ':nome' => $nome
            ]);

            header('Location: /quemseguir');
        }
    }