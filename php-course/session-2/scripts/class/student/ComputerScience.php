<?php
include 'Student.php';
include '../subject/Subject.php';


class ComputerScience extends Student
{

    // public $subjects =  array();
    public $subjects = array(
        new Subject("C", 100, 40),
        new Subject("Distributed System", 100, 40),
        new Subject("Computer Networks", 100, 40),
        new Subject("Artificial Intelligence", 100, 40)
    );

    function display()
    {
        echo "hello";
    }
    function __construct($name, $roll_no, $phone_no)
    {
        parent::__construct($name, $roll_no, $phone_no);
        $this->faculty = "Computer Science";

        // $subject_collection = array("C", "Distributed System", "Computer Networks", "Artificial Intelligence");


        // foreach ($subject_collection as $subject) {
        //     array_push($subjects,new Subject($subject,))
        // }
    }
}
