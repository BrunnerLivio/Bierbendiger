<?php
class AuthRepository{
	private static $salt = "Zwiebelringe";
    private static $userId;
	private static function Encode($value){
		return hash('sha256', $value.self::$salt);
	}
    
	private static function RememberMe($username, $id){
		$token = self::Encode($username);
		$rememberRepository = new RememberRepository;
		$remembers = $rememberRepository->LoadWhere("Token = '$token'");
		if(count($remembers) == 0)
		{
			$data = array(
				"Token" => $token,
				"Timestamp" => date('Y-m-d'),
                "UserId" => $id
			);
			$rememberId = $rememberRepository->Save($data);
			return $data;
		}
		else {
			$remember = $remembers[0];
			return array(
				"Token" => $remember["Token"],
				"Timestamp" => $remember["Timestamp"]
			);
		}
	}
    public static function GetUserId(){
        return self::$userId;
    }
	public static function Login($username, $password){
		$password = self::Encode($password);
		$userRepository = new UserRepository;
		$users = $userRepository->LoadWhere("Username = '$username' AND Password = '$password'");
		if(count($users) == 1){
			$user = $users[0];
            $_SESSION["user"] = $user;
			$data = self::RememberMe($username, $user["Id"]);
            $data["Value"] = $data["Token"];
            unset($data["Token"]);
			return array(
				"user" => array(
					"Id" => $user["Id"],
					"Username" => $user["Username"],
					"Email" => $user["Email"],
					"Profilepicture" => $user["Profilepicture"],
					"Token" => $data
				)
			);
		}
		return false;
	}
    public static function Autherize(){
        $appSettings = new AppSettings;
        if($appSettings->GetConfig()->Mode == "Debug"){
            $authHeader = getallheaders()["authorization"];
        } else {
            $authHeader = $_SERVER["REDIRECT_Authorization"];
        }
        if(isset($_SESSION["user"])){
            return true;
        }
        if(isset($authHeader)){
            $token = $authHeader;
            $rememberRepository = new RememberRepository;
            $remembers = $rememberRepository->LoadWhere("Token = '$token'");
            if(count($remembers) == 0){
                header('HTTP/1.0 401 Unauthorized');
                return false;
            } else {
                self::$userId = $remembers[0]["UserId"];
                return true;
            }
        }
        else {
            header('HTTP/1.0 401 Unauthorized');
            return false;
        }
    }
    public static function ChangePassword($oldPassword, $newPassword){
        $userRepository = new UserRepository;
        $user = $userRepository->LoadWhere("Id = ".self::$userId)[0];
        if($user["Password"] == self::Encode($oldPassword)){
            $userRepository->UpdateWhere("Id = ".self::$userId, [
                "Password" => self::Encode($newPassword)
            ]);
            return true;
        } else {
            return false;
        }
    }
}
?>