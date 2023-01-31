<?php
session_start();
require_once("config.php");
$sender_id = $_SESSION['unique_id'];
$res = "";



$sql = $pdo->prepare("SELECT * FROM usuario WHERE NOT unique_id=? ORDER BY id DESC");
$sql->execute(array($sender_id));
if ($sql->rowCount() == 0) {
  $res .= "nenhum usuario encontrado";
} else if ($sql->rowCount() > 0) {
  include("data.php");
}
echo $res;