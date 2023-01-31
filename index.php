<?php
session_start();
if (isset($_SESSION['unique_id'])) {
  header('location: main/users.php');
}

?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="img/favicon.png">
    <title>GChat</title>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="css/login.css">
  </head>
  <body>
    <form id="formLogin" method="post">
        <h1>Realize seu login</h1>

        <div id="error" class="oculto"></div>

        <div class="input-group">
            <label for="user">Seu e-mail ou nome de usuário</label>
            <input type="text" id="user" class="input-text" name="user" placeholder="insira seu e-mail o seu nome de usuário..." >
        </div>

        <div class="input-group">
            <label for="pass">Sua senha</label>
            <input type="password" id="pass" class="input-text" name="pass" placeholder="insira uma senha..." >
            <i class="bx bx-show"></i>
          </div>

        <button type="submit" id="sub" name="submit"><span id="btnText">Entrar</span> <div id="load" class="oculto"></div></button>

        <p><a href="registration.php">Ainda não tem uma conta? relize seu cadastro</a></p>
    </form>
    <script src="js/show-hide.js"></script>
    <script src="./js/login.js"></script>
  </body>
</html>
