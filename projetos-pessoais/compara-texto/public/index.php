<?php
declare(strict_types=1);

require_once '../vendor/autoload.php';

use App\Router;
use Dotenv\Dotenv;

error_reporting(E_ALL);
ini_set('display_errors', 'On');
ini_set('display_startup_errors', 'On');

$dotenv = Dotenv::createImmutable('../');
$dotenv->load();

$router = new Router();

$router->addRoute('GET', 'home', 'HomeController');
$router->addRoute('GET', '404', 'NotFoundController');
$router->addRoute('GET', 'texto', 'TextoController');
$router->addRoute('POST', 'texto', 'TextoController', 'createText');
$router->dispatch();