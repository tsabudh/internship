<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="index.css">

	<title>PHP</title>
</head>

<body>
	<h4>Add new employee </h4>
	<form method="post" action="create.php">
		Name:<br>
		<input type="text" name="name">
		<br>
		Email:<br>
		<input type="email" name="email">
		<br>
		Age:<br>
		<input type="number" name="age">
		<br>
		Designation:<br>
		<input type="text" name="designation">
		<br><br>
		<button type="submit" name="save" value="Create">Create</button>
	</form>
	<h3>Employee Details</h3>
	<?php
	include "./fetch.php";
	?>

</body>

</html>