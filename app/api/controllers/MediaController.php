<?php
class MediaController extends Controller {
	public function __construct(){
		parent::__construct("media");
	}
	public function Map(){
		$this->Route( 'GET', '/[i:id]', function($id) {
            $mediaRepository = new MediaRepository();
            $media = $mediaRepository->LoadWhere("Id = $id")[0];
            
            $img = imagecreatefromjpeg("images/gallery/".$media["Path"]);
            header("Content-Type: image/jpg");
            imagejpeg($img);
            imagedestroy($img);
            exit;
		});
		
	}
}
?>