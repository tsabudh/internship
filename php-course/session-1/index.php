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
    $myFile = fopen('text.txt', 'rw');
    $text = fread($myFile, filesize("text.txt"));
    $calory_carried = explode("\n\n", $text);

    foreach ($calory_carried as $calory) {
        $sum_calory[] = array_sum(explode("\n", $calory));
    }
    $max = max($sum_calory);
    echo ("Maximum calory carried by a monk is: $max ");
    rsort($sum_calory);
    echo nl2br("\nHighest three calories carried by a monk: ");
    for ($i = 0; $i < 3; $i++) {
        echo ($sum_calory[$i] . "\r\n");
    }
    ?>
</body>

</html>