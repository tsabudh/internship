<?php
class Subject
{
public $name;
public $full_marks;
public $pass_marks;

function __construct($name, $full_marks, $pass_marks)
{
$this->name = $name;
$this->full_marks = $full_marks;
$this->pass_marks = $pass_marks;
}
}