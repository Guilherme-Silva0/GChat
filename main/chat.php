<?php
session_start();
require_once("../php/config.php");
if (!isset($_SESSION['unique_id'])) {
  header('location: ../index.php');
} else {
  $userId = clearData($_GET['user_id']);
  $sql = $pdo->prepare("SELECT * FROM usuario WHERE unique_id=?");
  $sql->execute(array($userId));
  if ($sql->rowCount() > 0) {
    $user = $sql->fetch(PDO::FETCH_ASSOC);
  }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="../img/favicon.png">
  <title>GChat</title>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="../css/main.css">
</head>

<body>
  <div class="container">
    <section class="chat-area">
      <header>
        <div class="content">
          <a href="users.php" class="back-icon"><i class="bx bx-arrow-back"></i></a>
          <img src="../php/userimg/<?php echo $user['img'] ?>" alt="User image">
          <div class="details">
            <span><?php echo ucfirst($user['nome']) ?></span>
            <p class="<?php echo $user['status'] ?>">
              <?php echo ucfirst($user['status']) ?>
            </p>
          </div>
        </div>
        <button id="btnMenu"><i class='bx bx-dots-vertical-rounded'></i></button>
        <div id="menu" class="menu">
          <ul>
            <li id="btnFullScreen">Tela cheia</li>
            <li><a href="perfil.php?user=<?php echo $userId ?>">Ver perfil</a></li>
          </ul>
        </div>
      </header>
      <div id="chatBox" class="chat-box"></div>
      <form action="#" id="formMessage" class="typing-area" autocomplete="off">
        <input type="text" name="sender_id" value="<?php echo $_SESSION['unique_id']; ?>" hidden>
        <input type="text" name="recipient_id" value="<?php echo $userId; ?>" hidden>
        <input type="text" name="message" id="inputMessage" placeholder="Digite uma mensagem...">
        <button id="sendMessage"><i class="bx bx-send"></i></button>
      </form>
    </section>
    <script src="../js/chat.js"></script>
  </div>
</body>
</html>