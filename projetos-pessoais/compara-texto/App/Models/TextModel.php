<?php
namespace App\Models;

class TextModel
{
    /**
     * Returns the content of Database.json.
     *
     * @return array
     */
    public static function getBookList(): array
    {
        $bookList = [];

        if (file_exists($_ENV['DB_PATH'])) {
            $dbJson = file_get_contents($_ENV['DB_PATH']);
            $bookList = json_decode($dbJson, true);
        }

        return $bookList;
    }

    /**
     * Returns the text given by URI.
     *
     * @return string
     */
    public static function getTextFromURI(): string
    {
        $text = 'Texto indisponível.';

        try {
            $queryArr = [];
            parse_str($_SERVER['QUERY_STRING'], $queryArr);

            $path = $_ENV['DB_TEXT_PATH'] . $queryArr['text'] . '.txt';

            $text = file_get_contents($path);
        } catch (\Error $e) {
            //
        } finally {
            return $text;
        }
    }

    /**
     * Returns the title or name of the book depending on the search value.
     *
     * @param string $slug
     * @param string $search title || book
     * @return string
     */
    public static function getInfo(string $slug, string $search): string
    {
        $info = '';
        $dataJson = self::getBookList();

        foreach ($dataJson as $key => $book) {
            foreach ($book as $subKey => $data) {
                if ($slug == $data['path']) {
                    if ($search == 'title') {
                        $info = $subKey;
                    } elseif ($search == 'book') {
                        $info = $key;
                    }
                }
            }
        }

        return $info;
    }

    /**
     * Returns Book, Title and Text.
     *
     * @return array
     */
    public static function getTextInfoFromURI(string $slug): array
    {
        $arr = [];

        try {
            $arr['title'] = self::getInfo($slug, 'title');
            $arr['book'] = self::getInfo($slug, 'book');
            $arr['text'] = self::getTextFromURI();
        } catch (\Error $e) {
            //
        } finally {
            return $arr;
        }
    }

    /**
     * Create, modify or delete information in Json. If the information already exists, it is modified, otherwise it is created.
     *
     * @param string $book
     * @param string $title
     * @param string $path
     * @param string $text
     * @return void
     */
    public static function modifyDb(string $book, string $title, string $path, string $text): void
    {
        $db = self::getBookList();

        if (isset($_POST['action']) && $_POST['action'] == 'delete') {
            unset($db[$book][$title]);
        } else {
            $db[$book][$title] = [
                'creation-date' => date('Y-m-d H:i:s'),
                'path' => $path
            ];
        }

        $dbJson = json_encode($db);

        file_put_contents($_ENV['DB_PATH'], $dbJson);
        file_put_contents($_ENV['DB_TEXT_PATH'] . $path . '.txt', $text);
    }
}