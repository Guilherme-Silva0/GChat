<?php

require_once("config.php");
session_start();

if (!isset($_SESSION['unique_id'])) {
  header('location: ../index.php');
}


function updateImg()
{
  global $pdo;
  $dir = "userimg/";
  $sizeMax = 2097152;
  $allowed = array("jpg", "jpeg", "png");
  $extension = pathinfo($_FILES['img']['name'], PATHINFO_EXTENSION);
  $sql = $pdo->prepare("SELECT * FROM usuario WHERE unique_id=?");
  $sql->execute(array($_SESSION['unique_id']));
  if ($sql->rowCount() > 0) {
    $user = $sql->fetch(PDO::FETCH_ASSOC);
  }

  if ($_FILES['img']['size'] >= $sizeMax) {
    echo "tamanho maximo excedido";
  } else {
    if (!in_array($extension, $allowed)) {
      echo 'formato nao aceito';
    } else {
      $tmp = $_FILES['img']['tmp_name'];
      $newNameImg = uniqid() . ".$extension";
      if (move_uploaded_file($tmp, $dir . $newNameImg)) {
        if ($user['img'] !== 'user.png') {
          if (unlink($dir . $user['img'])) {
            $sql2 = $pdo->prepare('UPDATE usuario SET img=? WHERE unique_id=?');
            if ($sql2->execute(array($newNameImg, $_SESSION['unique_id']))) {
              echo "sucess";
            }
          }
        } else {
          $sql2 = $pdo->prepare('UPDATE usuario SET img=? WHERE unique_id=?');
            if ($sql2->execute(array($newNameImg, $_SESSION['unique_id']))) {
              echo "sucess";
            }
        }
      }
    }
  }
}

if (isset($_FILES['img'])) {
  updateImg();
}
