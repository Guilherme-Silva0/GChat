<?php
session_start();
require_once("../php/config.php");
if (!isset($_SESSION['unique_id'])) {
  header('location: ../index.php');
} else {
  $sql = $pdo->prepare("SELECT * FROM usuario WHERE unique_id=?");
  $sql->execute(array($_SESSION['unique_id']));
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
    <section class="users">
      <header>
        <a href="perfil.php?user=<?php echo $user['unique_id'] ?>" id="btn-perfil">
          <div class="content">
            <img src="../php/userimg/<?php echo $user['img'] ?>" alt="User image">
            <div class="details">
              <span><?php echo ucfirst($user['nome']) ?></span>
              <p><?php echo ucfirst($user['status']) ?></p>
            </div>
          </div>
        </a>
        <a href="../php/logout.php?logout_id=<?php echo $user['unique_id'] ?>" id="logout">Sair</a>
      </header>
      <div class="search">
        <span class="text">Inicie uma conversa</span>
        <input type="text" id="input-search" placeholder="Pesquise um usuário pelo nome">
        <button id="btn-search"><i id="icon-view" class="bx bx-search"></i></button>
      </div>
      <div id="users-list" class="users-list"></div>
    </section>
  </div>
  <script src="../js/users.js"></script>
</body>

</html>