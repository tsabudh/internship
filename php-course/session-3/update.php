<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Contact application</title>
</head>

<body>
    <h2>Update Contact Information</h2>
    
    <?php
    include 'database.php';
    $id = $_GET['id'];
    $sql = "SELECT * FROM employee WHERE id = 1";
    echo ($sql);
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $updateName = $row['name'];
        $updateEmail = $row['email'];
        $updateDesignation = $row['designation'];
    }
    ?>
    <form action="updateData.php" method="post">
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" value="<?php global $updateName;
                                                        echo $updateName ?>" required><br><br>
        <label for="email">Email:</label><br>
        <input type="text" id="email" name="email" value="<?php global $updateEmail;
                                                            echo $updateEmail ?>" required><br><br>
        <label for="designation">Designation:</label><br>
        <input type="text" id="designation" name="designation" value="<?php global $updateDesignation;
                                                            echo $updateDesignation ?>" required><br><br>
        <input type="hidden" id="id" name="id" value="<?php global $id;
                                                        echo $id ?>" required>
        <input type="submit" value="Update">
    </form>
</body>

</html>