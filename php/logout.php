<?php
session_start();
if (isset($_SESSION['unique_id'])) {
  require_once("config.php");
  $status = "offline";
  $offline_id = clearData($_GET['logout_id']);
  $sql = $pdo->prepare('UPDATE usuario SET status=? WHERE unique_id=?');
  if ($sql->execute(array($status, $offline_id))) {
    session_unset();
    session_destroy();
    header('location: ../index.php');
  } else {
    header('location: ../main/users.php');
  }
} else {
  header('location: ../index.php');
}

?>