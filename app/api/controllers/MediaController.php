<?php
class MediaController extends Controller {
	public function __construct(){
		parent::__construct("media");
	}
	public function Map(){
		$this->Route( 'GET', '/[i:id]', function($id) {
            $mediaRepository = new MediaRepository();
            $media = $mediaRepository->LoadWhere("Id = $id")[0];
            $path = "images/gallery/".$media["Path"];
            
            header("Content-Type: image/".pathinfo($path)["extension"]);
            header("Content-Length: ".filesize($path));
            
            $fp = fopen($path, 'rb');
            fpassthru($fp);
            exit;
		});
		
	}
}
?>