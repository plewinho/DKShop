<?php
require './include/db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['q'])){
    if(isset($_SESSION['logged_user'])){
        echo json_encode(['user' => $_SESSION['logged_user']['name']]);
    }
    else{
        echo json_encode(['user' => 'gość']);
    }
    exit();

}

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_SESSION['logged_user'])){
        session_unset();
        session_destroy();
        echo json_encode(['logout' => true]);
    }
    else
    echo json_encode(['logout' => false]);
    exit();
}

if($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['username']) && isset($_POST['password'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $stmt = "select * from user where username = ? and password = ?;";
    $prep_stmt = $conn->prepare($stmt);
    $prep_stmt->bind_param("ss", $username, $password);
    $prep_stmt->execute();
    $result = $prep_stmt->get_result();
if(    $user_array = $result->fetch_assoc()){
    $_SESSION['logged_user']['name'] = $user_array['username'];
    $_SESSION['logged_user']['id'] = $user_array['id'];
    echo json_encode(['user' => $_SESSION['logged_user']['name']]);


}
else 
echo json_encode(['error' => 'Niepoprawne dane logowania']);}
$prep_stmt->close();
exit();
