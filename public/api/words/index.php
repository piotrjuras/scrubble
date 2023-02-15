<?php
    $root = getenv('SHELL');
    $origin = "";

    if($root)
        $origin = "*";
    else
        $origin = "http://piotr.juras.pl";

    header('Access-Control-Allow-Origin: ' . $origin);


    $word = $_GET['word'];
    $wordLength = $_GET['wordlength'];

    $filename = "./words" . $wordLength . ".txt";
    $handle = fopen($filename, "r");

    $len = 1024;
    $contents = fread( $handle, $len );

    while (!feof($handle)) {
        $contents .= fread( $handle, $len );
    }

    $array = explode (',', $contents);

    $exists = array_search($word, $array);

    echo $exists;
?>