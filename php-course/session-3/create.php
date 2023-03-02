<?php
include 'database.php';

//POST
if (isset($_POST['save'])) {

	$name = $_POST['name'];
	$email = $_POST['email'];
	$age = $_POST['age'];
	$designation = $_POST['designation'];
	$sql = "INSERT INTO `employee` (`name`,`email`,`age`,`designation`)
	 VALUES ('$name','$email','$age','$designation')";


	if (mysqli_query($conn, $sql)) {
		header('Location:index.php');
	} else {
		echo "Error: " . $sql . "
" . mysqli_error($conn);
	}
	mysqli_close($conn);
}
