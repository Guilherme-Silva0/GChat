<?php
session_start();
require_once("config.php");

$name = clearData($_POST['name']);
$email = clearData($_POST['email']);
$pass = clearData($_POST['pass']);
$logErrorName = null;
$logErrorEmail = null;

function checkName() {
  $name = $_POST['checkName'];
  global $pdo,
  $logErrorName;
  $sql = $pdo->prepare("SELECT * FROM usuario WHERE nome=?");
  $sql->execute(array($name));
  if ($sql->rowCount() > 0) {
    echo "nome ja cadastrado";
    $logErrorName = 1;
  } else {
    $logErrorName = null;
  }
}

function checkEmail() {
  $email = $_POST['checkEmail'];
  global $pdo,
  $logErrorEmail;
  if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $logErrorEmail = null;
    $sql = $pdo->prepare("SELECT * FROM usuario WHERE email=?");
    $sql->execute(array($email));
    if ($sql->rowCount() > 0) {
      echo "email ja cadastrado";
      $logErrorEmail = 3;
    } else {
      $logErrorEmail = null;
    }
  } else {
    echo "email invalido";
    $logErrorEmail = 2;
  }
}

function signup($name, $email, $pass) {
  global $logErrorEmail,
  $logErrorName,
  $pdo;

  if ($logErrorEmail === null && $logErrorName === null) {
    $nameImg = "user.png";
    date_default_timezone_set('America/Sao_Paulo');
    $date = date('d/m/Y H:i:s');
    $passCript = password_hash($pass, PASSWORD_DEFAULT);
    $randon_id = rand(time(), 10000000);
    $status = 'online';
    $sqlInsert = $pdo->prepare('INSERT INTO usuario VALUES(null,?,?,?,?,?,?,?);');
    if ($sqlInsert->execute(array($randon_id, $name, $email, $passCript, $nameImg, $status, $date))) {
      $logErrorEmail = null;
      $sql = $pdo->prepare("SELECT * FROM usuario WHERE email=?");
      $sql->execute(array($email));
      if ($sql->rowCount() > 0) {
        $user = $sql->fetch(PDO::FETCH_ASSOC);
        $_SESSION['unique_id'] = $user['unique_id'];
        echo "success";
      }
    }
  }
}

if (isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['pass']) && !empty($_POST['pass']) && isset($_POST['reppass']) && !empty($_POST['reppass'])) {
  signup($name, $email, $pass);
}

if (isset($_POST['checkName']) && !empty($_POST['checkName'])) {
  checkName();
}

if (isset($_POST['checkEmail']) && !empty($_POST['checkEmail'])) {
  checkEmail();
}