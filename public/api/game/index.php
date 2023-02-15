<?php 
    $root = getenv('SHELL');
    $origin = "";

    if($root)
        $origin = "*";
    else
        $origin = "http://piotr.juras.pl";

    header('Access-Control-Allow-Origin: ' . $origin);

    $data = $_POST['data'];
    $gamePublicId = $_POST['gamePublicId'];
    $isLocal = $_POST['isLocal'];

    if($isLocal == "true"){
        $file = $_SERVER['DOCUMENT_ROOT'] . "/api/game/$gamePublicId.json";
    } else {
        $file = $_SERVER['DOCUMENT_ROOT'] . "/scrubble/api/game/$gamePublicId.json";
    }

    $fp = fopen($file, 'w');
    fwrite($fp, $data);
    fclose($fp);

    if(isset($_POST['create'])){
        echo 'created';
    } else {
        echo 'updated';
    }
?>