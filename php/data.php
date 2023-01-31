<?php
$you = "";
while ($user = $sql->fetch(PDO::FETCH_ASSOC)) {
  $sqlText = "SELECT * FROM mensagens WHERE (destinatario_msg_id = ?
              OR remetente_msg_id = ?) AND (remetente_msg_id = ?
              OR destinatario_msg_id = ?) ORDER BY id_msg DESC LIMIT 1";
  $sql3 = $pdo->prepare($sqlText);
  $sql3->execute(array($user['unique_id'], $user['unique_id'], $sender_id, $sender_id));
  $row = $sql3->fetch(PDO::FETCH_ASSOC);
  if ($sql3->rowCount() > 0) {
    $result = $row['msg'];
  } else {
    $result = "Nenhuma mensagem";
  }

  (strlen($result) > 20) ? $textMsg = substr($result, 0, 23) . "..." : $textMsg = $result;
  if(isset($sender_id) && isset($row['remetente_msg_id'])){
    ($sender_id == $row['remetente_msg_id']) ? $you = "Você: " : $you = "";
  }
  ($user['status'] == "offline") ? $offline = "offline" : $offline = "";

  $res .= '<a href="chat.php?user_id=' . $user['unique_id'] . '">
  <div class="content">
    <img src="../php/userimg/' . $user['img'] . '"  alt="User image">
    <div class="details">
      <span>' . $user['nome'] . '</span>
      <p>'  . $you . $textMsg . '</p>
    </div>
  </div>
  <div class="status-dot '.$offline.'"><i class="bx bxs-circle"></i></div>
  </a>';
}
