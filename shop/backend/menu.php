<?php 
require './include/db.php';
header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD'] === "GET"){
  $stmt = "select name from category where status=1;";
    if($result = $conn->query($stmt)){
      $arr = array();
      while($row = $result->fetch_assoc()){
        
          array_push($arr, $row['name']);
        
      }
      echo json_encode(['categories' => $arr]);
    }
    else{
      echo json_encode(['error' => 'bład']);
    }
    exit();
}



