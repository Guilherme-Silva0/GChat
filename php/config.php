<?php

$server = "";
$user = "";
$password = "";
$db = "";
$modo = "local";

if($modo == "local") {
    $server = "localhost";
    $user = "root";
    $password = "";
    $db = "gchat";
} else {
    $server = "";
    $user = "";
    $password = "";
    $db = "";
}

try {
    global $pdo;
    $pdo = new PDO("mysql:host=$server;dbname=$db", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $error) {
    echo "Erro na conexão com db";
    echo $error;
}

function clearData($dado) {
    $dado = trim((string)$dado);
    $dado = stripslashes($dado);
    $dado = htmlspecialchars($dado);
    return $dado;
  }

?>
