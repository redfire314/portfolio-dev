<?php
declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\StreamInterface;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;
use Slim\Exception\HttpNotFoundException;

use function DI\string;
use function PHPUnit\Framework\isEmpty;

return function (App $app) {
    // CORS Pre-Flight OPTIONS Request Handler
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        return $response;
    });

    // Redirect to API
    $app->get('/', function (Request $request, Response $response) {
        return $response
                ->withHeader('Location', '/api/v1/produtos')
                ->withStatus(302);
    });

    $app->group('/api/v1/produtos', function(Group $group) {
        $group->get('', function(Request $request, Response $response) {
            $service = $this->get('db');
            $prod = $service::table('produtos')->get();
            $prod = json_encode($prod);
            $response->getBody()->write($prod);
            return $response->withHeader('Content-Type', 'application/json');
        });

        $group->get('/[{id}]', function(Request $request, Response $response) {
            $id = $request->getAttribute('id');
            $service = $this->get('db');
            $prod = $service::table('produtos')->where('id', '=', $id)->get();
            $prod = json_encode($prod);
            $response->getBody()->write($prod);
            return $response->withHeader('Content-Type', 'application/json');
        });
    });

    $app->group('/api/v1/adm', function(Group $group) {
        $group->get('/test', function(Request $request, Response $response) {
            $response->getBody()->write('Você tem acesso!');
            return $response;
        });

        $group->post('/insert', function(Request $request, Response $response) {
            /*
            * nome
            * descricao
            * preco
            * fabricante
            */

            $post = $request->getParsedBody();
            $service = $this->get('db');
            $service::table('produtos')->insert($post);
            $response->getBody()->write('Produto criado!');
            return $response;
        });

        // Must be PUT - bugged (?) no getParsedBody
        $group->post('/update/{id}', function(Request $request, Response $response, array $args) {
            /*
            * nome
            * descricao
            * preco
            * fabricante
            */

            $post = $request->getParsedBody();
            $service = $this->get('db');
            $service::table('produtos')->where('id', '=', $args['id'])->update($post);
            $response->getBody()->write('Produto atualizado!');
            return $response;
        });

        $group->delete('/delete/{id}', function(Request $request, Response $response, array $args) {
            $service = $this->get('db');
            $service::table('produtos')->where('id', '=', $args['id'])->delete();
            $response->getBody()->write('Produto removido!');
            return $response;
        });
    });

    $app->post('/login', function(Request $request, Response $response, array $args) {
        /*
        * nome
        * senha
        */

        $post = $request->getParsedBody();
        $service = $this->get('db');
        $user = $service::table('usuarios')->where('nome', '=', $post['nome'])->where('senha', '=', $post['senha'])->get();
        if(isset($user[0]->id)) {
            $jwt = \Firebase\JWT\JWT::encode($user[0], $this->get('token'));
            $response->getBody()->write($jwt);
        }
        
        return $response;
    });

    /*
     * Catch-all route to serve a 404 Not Found page if none of the routes match
     * NOTE: make sure this route is defined last
     */
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function ($request, $response) {
        throw new HttpNotFoundException($request);
    });
};
