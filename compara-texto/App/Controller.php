<?php
namespace App;

class Controller
{
    /**
     * Renders the index view of the route.
     *
     * @return void
     */
    public function index(): void
    {
        $view = (new \ReflectionClass($this))->getShortName();
        $view = str_replace('Controller', '', $view);

        View::render(lcfirst($view));
    }
}