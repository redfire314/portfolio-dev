<?php
    namespace App;

    use App\RouteCollection;

    abstract class Dispacher extends RouteCollection {
        private $url;

        protected function setUri($url) {
            $this->url = explode('/', $url);
        }

        /*
            Method GET = 404
            header('Location: /inscreverse/?success'); >> OK
            header('Location: /inscreverse?success'); >> ERROR
        */
        protected function initRoute() {
            foreach ($this->routes as $route) {
                if($this->url[1] == $route['URI']) {
                    $controller = '\\App\\Src\\Controllers\\'.$route['Controller'];
                    $action = $route['Action'];
                    $class = new $controller;
                    $class->$action($this->url);

                    return;
                }
            }

            // Retornar página 404 e redirecionar para index após 3sec
            require_once '../App/Src/Views/404.phtml';
        }
    }
?>