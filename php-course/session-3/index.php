<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Session 3 </title>
</head>

<body>

    <?php
    interface Animal
    {
       
        public function makeSound();
    }

    class Rat implements Animal
    {
        public function makeSound()
        {
            echo "RRRR";
        }
    }

    $animal = new Rat();
    $animal->makeSound();



    abstract class Pet
    {
        abstract protected function greet();

        public function hasFur()
        {
            return true;
        }
    }

    class Cat extends Pet
    {
        public function greet()
        {
            return 'Meow!';
        }
    }

    $cat = new Cat();
    $cat->greet();             // Meow!
    $cat->hasFur();             // true

    ?>

</body>

</html>