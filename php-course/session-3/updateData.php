<?php
include 'database.php';
$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$designation = $_POST['designation'];

$sql = "UPDATE employee SET name = '$name', email = '$email' ,designation = '$designation' WHERE id = $id";
$result = mysqli_query($conn,$sql);
if($result){
    header('Location:index.php');
}
?>