<?php
include 'Student.php';


class ComputerScience extends Student
{

    public $subjects = array();

    function display()
    {
        echo "hello";
    }
    function __construct($name, $roll_no, $phone_no)
    {
        parent::__construct($name, $roll_no, $phone_no);
        $this->faculty = "Computer Science";

        $subject_collection = array("C", "Distributed System", "Computer Networks", "Artificial Intelligence");
        foreach ($subject_collection as $subject) {
        }
    }
}
