<?php 
// header('Access-Control-Allow-Origin: http://127.0.0.1:5501');
// header('Access-Control-Allow-Credentials: true');

//session_start(['cookie_same_site' => 'None', 'cookie_secure' => true]);


$conn = new mysqli("localhost:3306", "root", "", "dkshop");
if($conn->connect_errno){
    
echo json_encode(['error' => $conn->connect_error]);
exit();
}
