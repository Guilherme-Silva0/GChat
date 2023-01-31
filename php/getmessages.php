<?php
session_start();
if (isset($_SESSION['unique_id'])) {
  require_once("config.php");
  if (isset($_POST['sender_id']) && isset($_POST['recipient_id'])) {
    $sender_id = clearData($_POST['sender_id']);
    $recipient_id = clearData($_POST['recipient_id']);
    $res = "";

    $sqlText = "SELECT * FROM mensagens
              LEFT JOIN usuario ON (usuario.unique_id=mensagens.remetente_msg_id)
              WHERE (remetente_msg_id=? AND destinatario_msg_id=?)
              OR (remetente_msg_id=? AND destinatario_msg_id=?) ORDER BY id_msg;";
    $sql = $pdo->prepare($sqlText);
    $sql->execute(array($sender_id, $recipient_id, $recipient_id, $sender_id));
    if ($sql->rowCount() > 0) {
      while ($msg = $sql->fetch(PDO::FETCH_ASSOC)) {
        if ($msg['remetente_msg_id'] === $sender_id) {
          $res .= '<div class="chat outgoing">
        <div class="details">
          <p>' . $msg['msg'] . '</p>
          <span class="time">' . $msg['data'] . '</span>
        </div>
      </div>';
        } else {
          $res .= '<div class="chat incoming">
        <img src="../php/userimg/' . $msg['img'] . '" alt="">
        <div class="details">
          <p>' . $msg['msg'] . '</p>
          <span class="time">' . $msg['data'] . '</span>
        </div>
      </div>';
        }
      }
      echo $res;
    }
  }
} else {
  header("location: ../index.php");
}