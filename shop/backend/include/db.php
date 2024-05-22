<?php 
$conn = new mysqli("localhost:3306", "root", "", "dkshop");
if($conn->connect_errno){
echo json_encode(['error' => $conn->connect_error]);
exit();
}