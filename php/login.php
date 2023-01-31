<?php
session_start();
require_once("config.php");

$user = clearData($_POST['user']);
$pass = clearData($_POST['pass']);

function login($user, $pass)
{
  global $pdo;
  $sql = $pdo->prepare('SELECT * FROM usuario WHERE email=? OR nome=?');
  if ($sql->execute(array($user, $user))) {
    if ($sql->rowCount() > 0) {
      $result = $sql->fetch(PDO::FETCH_ASSOC);
      if (password_verify($pass, $result['senha'])) {
        $status = "online";
        $sql2 = $pdo->prepare('UPDATE usuario SET status=? WHERE unique_id=?');
        if ($sql2->execute(array($status, $result['unique_id']))) {
          $_SESSION['unique_id'] = $result['unique_id'];
          echo "success";
        }
      } else {
        echo "incorrect";
      }
    } else {
      echo "incorrect";
    }
  }
}

if (isset($_POST['user']) && !empty($_POST['user']) && isset($_POST['pass']) && !empty($_POST['pass'])) {
  login($user, $pass);
}
