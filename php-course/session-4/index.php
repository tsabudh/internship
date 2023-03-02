    <?php
    include  "./Model/Database.php";

    $db = new Database();
    var_dump($db);


    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        case 'GET':
            handleGetRequest();
            break;
        case 'POST':
            echo "THIS IS A POST REQUEST";

    }


    if ($method == 'GET') {
        echo "THIS IS A GET REQUEST";
    }
    if ($method == 'POST') {
        echo "THIS IS A POST REQUEST";
    }
    if ($method == 'PUT') {
        echo "THIS IS A PUT REQUEST";
    }
    if ($method == 'DELETE') {
        echo "THIS IS A DELETE REQUEST";
    } ?>
