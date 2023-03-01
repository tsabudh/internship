<?php
include 'Student.php';
include(__DIR__ . '/../subject/Subject.php');


class ComputerScience extends Student
{

    public $subjects =  array();


    function display()
    {
        echo "hello";
    }
    function __construct($name, $roll_no, $phone_no)
    {
        $subjects = array(
            new Subject("C", 100, 40),
            new Subject("Distributed System", 100, 40),
            new Subject("Computer Networks", 100, 40),
            new Subject("Artificial Intelligence", 100, 40)
        );
        parent::__construct($name, $roll_no, $phone_no);
        $this->subjects = $subjects;
        $this->faculty = "Computer Science";

        // $subject_collection = array("C", "Distributed System", "Computer Networks", "Artificial Intelligence");


        // foreach ($subject_collection as $subject) {
        //     array_push($subjects,new Subject($subject,))
        // }
    }
    function setObtainedMarks($c, $dist, $cn, $ai)
    {
      
        $this->subjects[0]->obtained_marks = $c;
        $this->subjects[1]->obtained_marks = $dist;
        $this->subjects[2]->obtained_marks = $cn;
        $this->subjects[3]->obtained_marks = $ai;
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
