<?php

session_start();
if (isset($_SESSION['unique_id'])) {
  require_once("config.php");
  $sender_id = clearData($_POST['sender_id']);
  $recipient_id = clearData($_POST['recipient_id']);
  $message = clearData($_POST['message']);

  if (!empty($message)) {
    date_default_timezone_set('America/Sao_Paulo');
    $date = date('d/m/Y H:i');
    $sql = $pdo->prepare("INSERT INTO mensagens VALUES(null,?,?,?,?)");
    if ($sql->execute(array($sender_id, $recipient_id, $message, $date))) {
      echo "messagem enviada";
    }
  }
} else {
  header("location: ../index.php");
}
