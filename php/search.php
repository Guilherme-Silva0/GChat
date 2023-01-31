<?php
session_start();
require_once("config.php");
$sender_id = $_SESSION['unique_id'];

$searchTerm = clearData($_POST["searchTerm"]);
$res = "";

$sql = $pdo->prepare("SELECT * FROM usuario WHERE NOT unique_id = :unique_id AND (nome LIKE :searchTerm) ORDER BY nome");
$sql->bindValue(":unique_id", $sender_id);
$sql->bindValue(":searchTerm", "%".$searchTerm."%");
$sql->execute();
if($sql->rowCount() > 0) {
  include("data.php");
} else {
  $res .= "nenhum usuario encontrado";
}

echo $res;

?>