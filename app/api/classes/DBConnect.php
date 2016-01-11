<?php
abstract class DBConnect{
	protected $conn;
	public function __construct(){
		$AppSettings = new AppSettings();
		$config = $AppSettings->GetConfig();

		$databaseConfig = $config->Database->{$config->Mode};
		$this->conn = mysqli_connect($databaseConfig->host, $databaseConfig->username, $databaseConfig->password);
		mysqli_set_charset($this->conn, "utf8");
		
		if(mysqli_connect_errno()){
			echo "failed to connect to mysql". mysqli_connect_errno();
            header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
		}
		mysqli_select_db($this->conn, $databaseConfig->database) or die("Nicht gefunden");
	}
    public function GetQueryError(){
        return mysqli_error ($this->conn);
    }
    public function GetLastInsertedId(){
        return mysqli_insert_id($this->conn);
    }
    
}


?>