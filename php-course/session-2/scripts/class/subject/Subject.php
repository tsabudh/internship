<?php
class Subject
{
    public $name;
    public $full_marks;
    public $pass_marks;
    public $obtained_marks;

    function __construct($name, $full_marks, $pass_marks, $obtained_marks = null)
    {
        $this->name = $name;
        $this->full_marks = $full_marks;
        $this->pass_marks = $pass_marks;
        $this->obtained_marks = $obtained_marks;
    }

    function setObtainedMarks($obtained_marks)
    {
        $this->obtained_marks = $obtained_marks;
    }
}
