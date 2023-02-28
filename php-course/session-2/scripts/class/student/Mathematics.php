<?php 
include "Student.php";
include "../subject/Subject.php";



class Mathematics extends Student
{

public $subjects = array("Calculus", "Linear Algebra", "Number System", "Set Theory");
function __construct($name, $roll_no, $phone_no)
{
parent::__construct($name, $roll_no, $phone_no);
$this->faculty = "Mathematics";
}
}
