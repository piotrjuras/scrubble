<?php 
    header('Access-Control-Allow-Origin: *');

    $data = $_POST['data'];
    $gamePublicId = $_POST['gamePublicId'];
    $isLocal = $_POST['isLocal'];

    if($isLocal == "true"){
        $file = $_SERVER['DOCUMENT_ROOT'] . "/api/games/$gamePublicId.json";
    } else {
        $file = $_SERVER['DOCUMENT_ROOT'] . "/scrubble/api/games/$gamePublicId.json";
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