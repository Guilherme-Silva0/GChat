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
    <form id="formsignup" method="post" enctype="multipart/form-data">
        <h1>Realize seu cadastro</h1>

        <div id="error" class="oculto"></div>

        <div class="input-group">
            <label for="name">Nome de usuário</label>
            <span id="input-error-name" class="error-input oculto"></span>
            <span id="name-load" class="mini-load oculto"></span>
            <input type="text" id="name" class="input-text" name="name" placeholder="insira seu nome..." >
        </div>

        <div class="input-group">
            <label for="email">Seu melhor e-mail</label>
            <span id="input-error-email" class="error-input email oculto"></span>
            <span id="email-load" class="mini-load oculto"></span>
            <input type="email" id="email" class="input-text" name="email" placeholder="insira seu e-mail..." >
        </div>

        <div class="input-group">
            <label for="pass">Escolha uma senha</label>
            <span id="input-error-pass" class="error-input pass oculto"></span>
            <input type="password" id="pass" class="input-text" name="pass" placeholder="insira uma senha..." >
            <i class="bx bx-show"></i>
        </div>

        <div class="input-group">
            <label for="reppass">Repita sua senha</label>
            <span id="input-error-reppass" class="error-input reppass oculto"></span>
            <input type="password" id="reppass" class="input-text" name="reppass" placeholder="repita sua senha..." >
        </div>

        <button type="submit" id="sub" name="submit"><span id="btnText">Cadastrar</span> <div id="load" class="oculto"></div></button>
        <p><a href="index.php">Voltar para página de login</a></p>
    </form>
    <script src="js/show-hide.js"></script>
    <script src="js/signup.js"></script>
  </body>
</html>
