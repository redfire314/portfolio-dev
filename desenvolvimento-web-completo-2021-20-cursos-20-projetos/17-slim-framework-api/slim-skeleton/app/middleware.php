<?php
declare(strict_types=1);

use App\Application\Middleware\SessionMiddleware;
use Slim\App;
use DI\Container;

return function (App $app, Container $container) {
    $app->add(SessionMiddleware::class);

    // Check Token for admin pages
    $app->add(new \Tuupola\Middleware\JwtAuthentication([
        'path' => '/api/v1/adm',
        'regexp' => "/(.*)/",
        'secret' => $container->get('token')
    ]));

    // Enable CORS
    $app->add(function ($request, $handler) {
        $response = $handler->handle($request);
        return $response
                ->withHeader('Access-Control-Allow-Origin', '*')
                ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
                ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    });

};
