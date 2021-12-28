<?php
    namespace App\Src\Controllers;

    use App\Src\Models\Usuarios;

    class AuthController {
        public function registrar() {
            $registrar = new Usuarios;
            $registrar->cadastrar();
        }

        public function login() {
            $login = new Usuarios;
            $login->getUser();
        }
    }