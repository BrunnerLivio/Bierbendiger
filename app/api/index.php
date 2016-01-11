<?php
include 'vendor/AltoRouter.php';
include 'classes/DBConnect.php';
include 'classes/Repository.php';
include 'classes/Controller.php';
include 'classes/AppSettings.php';


header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: Authorization, *");


foreach (glob("repositories/*.php") as $filename)
{
    require $filename;
}
foreach (glob('controllers/*.php') as $file)
{
    require_once $file;
    $class = basename($file, '.php');
    if (class_exists($class))
    {
        $controller = new $class;
        $controller->Map();
        $controller->Apply();
    }
}
?>