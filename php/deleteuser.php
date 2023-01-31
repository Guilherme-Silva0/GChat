<?php
require_once("config.php");
session_start();

if (isset($_POST['pass']) && !empty($_POST['pass'])) {
  $pass = $_POST['pass'];
  $user = $_SESSION['unique_id'];
  $sql = $pdo->prepare("SELECT * FROM usuario WHERE unique_id=?");
  $sql->execute(array($user));
  if ($sql->rowCount() > 0) {
    $user = $sql->fetch(PDO::FETCH_ASSOC);
    if (password_verify($pass, $user['senha'])) {
      if ($user['img'] !== 'user.png') {
        $dir = "userimg/";
        if (unlink($dir . $user['img'])) {
          $sql2 = $pdo->prepare('DELETE FROM usuario WHERE unique_id=?');
          if ($sql2->execute(array($user['unique_id']))) {
            $sql3 = $pdo->prepare('DELETE FROM mensagens WHERE remetente_msg_id=? OR destinatario_msg_id=?');
            if ($sql3->execute(array($user['unique_id'], $user['unique_id']))) {
              session_unset();
              session_destroy();
              echo "success";
            }
          }
        }
      } else {
        $sql2 = $pdo->prepare('DELETE FROM usuario WHERE unique_id=?');
        if ($sql2->execute(array($user['unique_id']))) {
          $sql3 = $pdo->prepare('DELETE FROM mensagens WHERE remetente_msg_id=? OR destinatario_msg_id=?');
          if ($sql3->execute(array($user['unique_id'], $user['unique_id']))) {
            session_unset();
            session_destroy();
            echo "success";
          }
        }
      }
    } else {
      echo "incorrect";
    }
  } else {
    echo "incorrect";
  }
}
