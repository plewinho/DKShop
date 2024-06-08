<?php 
require './include/db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


if($_SERVER['REQUEST_METHOD'] === "GET" && isset($_GET['id'])){

  $stmt = "select stock from inventory where product_id = ?;";
  $prep_stmt = $conn->prepare($stmt);
  $id = $_GET['id'];
    $prep_stmt->bind_param("i", $id);
    $prep_stmt->execute();

  if($result = $prep_stmt->get_result()){
   
    echo json_encode(['stock' => $result->fetch_assoc()['stock']]);
  }
  else{
    echo json_encode(['error' => 'bład']);
  }
  $prep_stmt->close();
  exit();

}