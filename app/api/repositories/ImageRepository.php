<?php
class ImageRepository{
    private $thumnailWidth = 150;
    public function SaveImage($img, $newFileName){
         if (!file_exists('images/')) {
            mkdir('images/', 0777, true);
        }
        if (!file_exists('images/gallery/')) {
            mkdir('images/gallery/', 0777, true);
        }
        if (!file_exists('images/gallery/temp/')) {
            mkdir('images/gallery/temp/', 0777, true);
        }
        if (!file_exists('images/gallery/full/')) {
            mkdir('images/gallery/full/', 0777, true);
        }
        if (!file_exists('images/gallery/thumbnail/')) {
            mkdir('images/gallery/thumbnail/', 0777, true);
        }
        
        $fileExtension = strtolower (end((explode(".", $img["name"]))));
        $oldMediaName = $newFileName.".".$fileExtension;
        $fileName = $img["name"];
        $source = $img["tmp_name"];
        $oldPath = 'images/gallery/temp/'.$oldMediaName;
        $newPath = 'images/gallery/full/'.$newFileName.".jpg";
        move_uploaded_file($source, $oldPath);
        list($width, $height) = getimagesize($oldPath);
        $tn = imagecreatetruecolor($width, $height);
        if($fileExtension == "jpg"){
            $image = imagecreatefromjpeg($oldPath);
        } else if($fileExtension == "png"){
            $image = imagecreatefrompng($oldPath);
        } else if($fileExtension == "gif"){
            $image = imagecreatefromgif($oldPath);
        } else {
            throw new Exception('Filetype not found');
        }
        unlink($oldPath);
        imagecopyresampled($tn, $image, 0, 0, 0, 0, $width, $height, $width, $height);
        imagejpeg($tn, $newPath,50);
        if($this->thumnailWidth < $width){
            $this->GenerateThumbnail($newPath, 'images/gallery/thumbnail/'.$newFileName.".jpg", 150);
        }
    }
    public function CacheImage($src){
        session_cache_limiter('none');
        header('Cache-control: max-age='.(60*60*24*365));
        header('Expires: '.gmdate(DATE_RFC1123,time()+60*60*24*365));
header('Last-Modified: '.gmdate(DATE_RFC1123,filemtime($src)));
        if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE'])) {
        header('HTTP/1.1 304 Not Modified');
        die();
        }
    }
    private function GenerateThumbnail($src, $dest, $desired_width) {
        $source_image = imagecreatefromjpeg($src);
        $width = imagesx($source_image);
        $height = imagesy($source_image);
        
        $desired_height = floor($height * ($desired_width / $width));
        
        $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
        
        imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
        imagejpeg($virtual_image, $dest);
    }
}
?>