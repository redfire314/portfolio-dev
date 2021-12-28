<?php
    // Dados do response
    class Dashboard
    {
        private $data = [
            'numVenda' => 0,
            'totalVenda' => 0
        ];

        // private $clienteAtivo;
        // private $clienteInativo;
        // private $totalReclamacao;
        // private $totalElogio;
        // private $totalSugestao;
        // private $totalDespesa;

        public function __get($attr)
        {
            return $this->data[$attr];
        }

        public function __set($attr, $value)
        {
            $this->data[$attr] = $value;
        }

        public function toJson()
        {
            return json_encode($this->data);
        }
    }

    // Interação com o MySQL
    class Bd
    {
        private $pdo;
        private $dataInicio;
        private $dataFim;

        public function __construct($dataAno, $dataMes)
        {
            $dataDia = cal_days_in_month(CAL_GREGORIAN, $dataMes, $dataAno);
            $this->dataInicio = "$dataAno-$dataMes-01";
            $this->dataFim = "$dataAno-$dataMes-$dataDia";
        }

        public function connect()
        {
            try {
                $this->pdo = new PDO('Hello World');
                return true;
            } catch (PDOException $e) {
                echo $e;
                return false;
            }
        }

        public function getNumVenda()
        {
            $stmt = $this->pdo->prepare('SELECT COUNT(*) AS num_venda FROM tb_vendas WHERE data_venda BETWEEN :inicio AND :fim');
            $stmt->execute([':inicio' => "$this->dataInicio", ':fim' => "$this->dataFim"]);
            return $stmt->fetch(PDO::FETCH_OBJ)->num_venda;
        }

        public function getTotalVenda()
        {
            $stmt = $this->pdo->prepare('SELECT SUM(total) AS total_venda FROM tb_vendas WHERE data_venda BETWEEN :inicio AND :fim');
            $stmt->execute([':inicio' => "$this->dataInicio", ':fim' => "$this->dataFim"]);
            return $stmt->fetch(PDO::FETCH_OBJ)->total_venda;
        }
    }

    // Função que inicia o algoritmo
    function getData()
    {
        $data = explode('-', $_GET['competencia']);
        $dashboard = new Dashboard();
        $bd = new Bd($data[0], $data[1]);
        if ($bd->connect()) {
            $dashboard->__set('numVenda', $bd->getNumVenda());
            $dashboard->__set('totalVenda', $bd->getTotalVenda());
            print_r($dashboard->toJson());
        }
    }

    // Início
    if (isset($_GET) && $_GET['competencia'] != '') {
        getData();
    }