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
        $this->Route('POST', '/changepassword', function(){
            $request = $this->GetRequestData();
            if(isset($request->oldPassword) && isset($request->newPassword)){
                if(AuthRepository::Autherize()){
                    $this->Send(["Status" => AuthRepository::ChangePassword($request->oldPassword, $request->newPassword)]);
                }
            } else {
                $this->NotFound();
            }
        });
        $this->Route('GET', '/[i:id]/profilepicture', function($id){
            $userRepository = new UserRepository();
            $user = $userRepository->LoadWhere("Id = $id")[0];
            $img = imagecreatefromjpeg("images/profilepictures/".$user["Profilepicture"]);
            header("Content-Type: image/jpg");
            imagejpeg($img);
            imagedestroy($img);
            exit;
        });
	}
}
?>