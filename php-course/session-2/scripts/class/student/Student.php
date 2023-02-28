<?php

// namespace user;
class Student
{
    // Properties
    public $name;
    public $gender;
    public $roll_no;
    public $phone_no;

    public $faculty;
    // abstract public function getSubjects();
    // Methods
    public function __construct($name, $roll_no, $phone_no)
    {
        $this->name = $name;
        $this->roll_no = $roll_no;
        $this->phone_no = $phone_no;
    }

    public function get_name()
    {
        return $this->name;
    }


    public function get_subjects()
    {
    }
}
?>
