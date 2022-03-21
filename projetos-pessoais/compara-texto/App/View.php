<?php
namespace App;

class View
{
    /**
     * Renders the view.
     *
     * @param string $view
     * @param array $var
     * @return void
     */
    public static function render(string $view, array $var = []): void
    {
        include_once 'Views/components/head.phtml';
        include_once 'Views/components/navbar.phtml';

        if (file_exists(__DIR__ . '/Views/' . $view . '.phtml')) {
            include_once 'Views/' . $view . '.phtml';
        } else {
            include_once 'Views/notFound.phtml';
        }

        include_once 'Views/components/footer.phtml';
    }
}