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
    abstract class Student
    {
        // Properties
        public $name;
        public $gender;
        public $roll_no;
        public $phone_no;

        // abstract public function getSubjects();
        // Methods
        function __construct($name, $roll_no, $phone_no)
        {
            $this->name = $name;
            $this->roll_no = $roll_no;
            $this->phone_no = $phone_no;
        }

        function get_name()
        {
            return $this->name;
        }
        function get_object()
        {
            $object = array();
            array_push($object, $this->name, $this->roll_no, $this->phone_no);
            return $object;
        }
    }

    class ComputerScience extends Student
    {

        public $subjects = array("C", "Distributed System", "Computer Networks", "Artificial Intelligence");

        function __construct($name, $roll_no, $phone_no)
        {
            parent::__construct($name, $roll_no, $phone_no);
        }
    }
    class Mathematics extends Student
    {
        public $subjects = array("Calculus", "Linear Algebra", "Number System", "Set Theory");
        function __construct($name, $roll_no, $phone_no)
        {
            parent::__construct($name, $roll_no, $phone_no);
        }
    }




    // $outside = new Company("Outside", "Jhamsikhel", "01-445320");
    // echo ($outside->get_name());
    foreach ($outside->get_object() as $property) {
        echo nl2br("\n" . $property);
    }

    ?>
</body>

</html>