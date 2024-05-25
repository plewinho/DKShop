<?php 
require './include/db.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


if($_SERVER['REQUEST_METHOD'] === "GET"){

  $stmt = "select * from banner where status=1;";
  if($result = $conn->query($stmt)){
    $arr = array();
    while($rowArray = $result->fetch_assoc()){

    
        array_push($arr, $rowArray);
      
    }
    echo json_encode(['banners' => $arr]);
  }
  else{
    echo json_encode(['error' => 'bład']);
  }
  exit();

}