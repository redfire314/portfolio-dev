<?php
namespace App\Controllers;

use App\Controller;
use App\Models\TextModel;
use App\View;
use Cocur\Slugify\Slugify;

class TextoController extends Controller
{
    /**
     * Overwrites the index method from parent retrieving data from db.json.
     *
     * @return void
     */
    public function index(): void
    {
        // Array used to render dynamic elements in Front-End (Book list and text)
        $dbJson['books'] = TextModel::getBookList();

        if (isset($_GET['text'])) {
            $dbJson['info'] = TextModel::getTextInfoFromURI($_GET['text']);
        } else {
            $dbJson['info']['book'] = '';
            $dbJson['info']['title'] = '';
            $dbJson['info']['text'] = '';
        }

        View::render('texto', $dbJson);
    }

    /**
     * Creates a new text in db.json.
     *
     * @return void
     */
    public function createText(): void
    {
        if (
            isset($_POST['book']) &&
            isset($_POST['title']) &&
            isset($_POST['text'])
            ) {
            if (file_exists($_ENV['DB_PATH'])) {
                $slug = new Slugify();
                TextModel::modifyDb($_POST['book'], $_POST['title'], $slug->slugify($_POST['book'] . ' ' . $_POST['title']), $_POST['text']);
                header('Location: /texto');
            } else {
                echo 'Banco de Dados não encontrado.';
            }
        } else {
            echo 'Complete todos os campos.';
        }
    }
}