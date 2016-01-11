<?php
class UserController extends Controller {
	public function __construct(){
		parent::__construct("user");
	}
	
	public function Map(){
		$this->Route( 'POST', '/login', function() {
			$request = $this->GetRequestData();
			if(isset($request->username) && isset($request->password)){
				$authCallback = AuthRepository::Login($request->username, $request->password);
				if($authCallback != false){
					$this->Send($authCallback);
				}
				else {
					$this->Unauthorized();
				}
				
				
			}
			else 
			{
				
				$this->NotFound();
			}
		});
		
	}
}
?>