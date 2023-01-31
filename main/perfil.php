<?php
  session_start();
  require_once("../php/config.php");
  if(!isset($_SESSION['unique_id'])){
    header('location: ../index.php');
  } else {
    $sql = $pdo->prepare("SELECT * FROM usuario WHERE unique_id=?");
    $sql->execute(array($_GET['user']));
    if($sql->rowCount() > 0) {
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
    <section class="perfil">
      <header>
        <a href="users.php" class="back-icon"><i class="bx bx-arrow-back"></i></a>
        <p><?php if($_GET['user'] == $_SESSION['unique_id']) echo "Seu Perfil"; else echo "Perfil de usuário";?></p>
      </header>
      <div class="img-group"><img src="../php/userimg/<?php echo $user['img']?>" alt="img user"></div>
      <?php if($_GET['user'] == $_SESSION['unique_id']) { ?>
      <p id="result" class=""></p>
      <div class="input-group">
        <label for="newImg"><span id="label-text"><i class='bx bx-pencil'></i> Alterar foto de perfil</span><div id="load" class="oculto"></div></label>
        <input type="file" id="newImg">
      </div>
     <?php } ?>
      <p id="nome">Nome: <?php echo ucfirst($user['nome'])?></p>
      <p id="email">E-mail: <?php echo $user['email']?></p>
      <?php if($_GET['user'] == $_SESSION['unique_id']) { ?>
      <div class="box-buttons">
        <a href="deleteUserConfirm.php" id="delete-user">Excluir conta</a>
      </div>
      <?php } ?>
    </section>
  </div>
  <?php if($_GET['user'] == $_SESSION['unique_id']) { ?><script src="../js/perfil.js"></script><?php } ?>
</body>
</html>
