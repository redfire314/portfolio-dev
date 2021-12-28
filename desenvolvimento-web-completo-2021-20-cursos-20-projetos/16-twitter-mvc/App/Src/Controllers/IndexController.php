<?php
    namespace App\Src\Controllers;

    class IndexController {
        public function index() {
            require_once '../App/Src/Views/index.phtml';
        }

        public function inscreverse() {
            require_once '../App/Src/Views/inscreverse.phtml';
        }
    }
?>