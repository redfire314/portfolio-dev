<?php
namespace App;

class Router
{
    // Route collection
    private $routes = [];

    /**
     * Add route to the route collection.
     *
     * @param string $method HTTP Verb.
     * @param string $path URL.
     * @param string $controller Class to instantiate.
     * @param string $action Method to call.
     * @return void
     */
    public function addRoute(string $method, string $path, string $controller, string $action = 'index'): void
    {
        $this->routes[$method][$path] = [
            'controller' => $controller,
            'action' => $action
        ];
    }

    /**
     * Get the layer of the path request.
     *
     * @param integer $layer
     * @return string
     */
    public function getRoute(int $layer): string
    {
        $path = $_SERVER['PATH_INFO'] ?? 'home';
        $path = $path != 'home' ? explode('/', $path)[$layer] : $path;

        return $path;
    }

    /**
     * Instantiates the Controller and calls the Action from the URL.
     *
     * @return void
     */
    public function dispatch(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $this->getRoute(1);

        try {
            $controller = '\App\Controllers\\' . $this->routes[$method][$path]['controller'];
            $action = $this->routes[$method][$path]['action'];

            $controller = new $controller();
            $controller->$action();
        } catch (\Error $e) {
            header('Location: /404');
        }
    }
}