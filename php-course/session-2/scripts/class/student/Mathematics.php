<?php
include "Student.php";
include "../subject/Subject.php";



class Mathematics extends Student
{
    public $subjects = array();
    
    // public $subjects = array("Calculus", "Linear Algebra", "Number System", "Set Theory");
    function __construct($name, $roll_no, $phone_no)
    {

        $subjects = array(
            new Subject("C", 100, 40),
            new Subject("Distributed System", 100, 40),
            new Subject("Computer Networks", 100, 40),
            new Subject("Artificial Intelligence", 100, 40)
        );
        parent::__construct($name, $roll_no, $phone_no);
        $this->faculty = "Mathematics";
    }


    function getAverageMarks()
    {
        $sum = 0;
        $subject_count = 0;
        foreach ($this->subjects as $subject) {
            $sum = $sum + $subject->obtained_marks;
            $subject_count++;
        }
        $average = $sum / $subject_count;
        return $average;
    }
}
