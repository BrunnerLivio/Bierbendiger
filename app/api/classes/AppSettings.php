<?php
class AppSettings{
	private $filePath = "app.json";
	private $fileInfo;
	public function __construct(){
		$appConfig = fopen($this->filePath, "r");
		$this->fileInfo = json_decode(fread($appConfig,filesize($this->filePath)));
		fclose($appConfig);
	}
	public function GetConfig(){
		return $this->fileInfo;
	}
}
?>