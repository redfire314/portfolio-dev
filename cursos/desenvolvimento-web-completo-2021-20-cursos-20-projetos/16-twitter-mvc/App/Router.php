<?php
    namespace App;

    use App\Dispacher;

    class Router extends Dispacher {
        public function __construct() {
            $this->setUri($_SERVER['REQUEST_URI']);
            $this->initRoute();
        }
    }
?>