<?php
class Database
{
   private $host = "localhost";
   private $database_name = "crud";
   private $username = "root";
   private $password = "";
   public $conn;
   public function getConnection()
   {
      $this->conn = null;
      try {
         $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->database_name);
      } catch (void) {
         echo "Database could not be connected: ";
      }
      return $this->conn;
   }
}

$db = new Database();
$conn = $db->getConnection();
