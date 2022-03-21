<?php
    namespace App\Src\Models;

    abstract class Model
    {
        protected $conn;

        protected function initCon()
        {
            try {
                $this->conn = new \PDO('Hello World');
            } catch (\PDOException $e) {
                echo $e;
            }
        }
    }