<?php
abstract class Controller{
	private $router;
	private $controllerName;
	public function __construct($controllerName){
		$this->router = new AltoRouter();
		$this->router->setBasePath( '/api');
		$this->controllerName = $controllerName;
	}
	public function Apply(){
		$match = $this->router->match();
		if( $match && is_callable( $match['target'] ) ) {
			call_user_func_array( $match['target'], $match['params'] ); 
		} 
	}
	protected function redirect($path){
		header('Location: /api/'.$path);
	}
	protected function Route($method, $route, $target, $name = null) {
		$this->router->map($method, '/'.$this->controllerName.$route, $target, $name);
	}
    protected function NotFound(){
       header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
    }
    protected function Unauthorized(){
        header('HTTP/1.0 401 Unauthorized');
    }
    protected function Ok(){
       header( $_SERVER["SERVER_PROTOCOL"] . ' 200 OK');
    }
    protected function Send($obj){
        header('Content-Type: application/json');
        echo json_encode($obj);
    }
    protected function GetRequestData(){
		return json_decode(file_get_contents("php://input"));
	}
}
?>