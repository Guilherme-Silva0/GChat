<?php
session_start();
if (!isset($_SESSION['unique_id'])) {
  header('location: ../index.php');
}


?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="../img/favicon.png">
  <title>GChat</title>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
  <link rel="stylesheet" href="../css/login.css">
</head>

<body>
  <form id="formConfirm" method="post">
    <h1>Confirme sua identidade</h1>
    <div id="error" class="oculto"></div>
    <p>Para sua segurança, pedimos que insira sua senha para confirmar sua identidade!</p>
    <div class="input-group">
      <label for="pass">Sua senha</label>
      <input type="password" id="pass" class="input-text" name="pass" placeholder="insira uma senha...">
      <i class="bx bx-show"></i>
    </div>
    <button id="sub">confirmar</button>
    <div class="container-confirm oculto">
      <div class="box-confirm">
        <p id="p">Deseja realmente excluir sua conta?</p>
        <div class="box-buttons">
          <a href="users.php" id="btn-give-up">Não</a>
          <button type="submit" id="btn-confirm"><span id="btnText">Sim</span><div id="load" class="oculto"></div></button>
        </div>
      </div>
    </div>
  </form>
  <script src="../js/show-hide.js"></script>
  <script src="../js/delete-user.js"></script>
</body>

</html>