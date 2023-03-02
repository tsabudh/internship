<?php
include 'database.php';
$id = $_GET['id'];
$sql = "DELETE FROM employee WHERE id = $id";
$result = mysqli_query($conn,$sql);
if($result){
    header('Location:index.php');
}
?>