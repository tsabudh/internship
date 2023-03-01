<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Session 1 </title>
</head>

<body>


    <?php

    include './scripts/class/student/ComputerScience.php';
    $punya = new ComputerScience("Punya Dahal", "15", "9867816306");
    $punya->setObtainedMarks(90, 86, 79, 78);

    echo "The average marks of Punya is: " . $punya->getAverageMarks();

    echo $punya;
    ?>
</body>

</html>