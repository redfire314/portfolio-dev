<?php
namespace App\Controllers;

use App\Controller;
use App\Models\TextModel;
use App\View;

class HomeController extends Controller
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
            $dbJson['text'] = TextModel::getTextFromURI();
        }

        View::render('home', $dbJson);
    }
}