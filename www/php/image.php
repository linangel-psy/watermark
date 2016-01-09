<?php
require_once "../../composer.local/vendor/autoload.php";
use \WideImage\WideImage as WideImage;
session_start();
/*
$file_name = $_FILES['upload']['name'];
$file_dist = $_SERVER['DOCUMENT_ROOT'].'/www/img/uploads/';

$watermark_file_name = $_FILES['upload_watermark']['name'];
$watermark_file_dist = $_SERVER['DOCUMENT_ROOT'].'/www/img/uploads/';

$new_file_path = $_SERVER['DOCUMENT_ROOT'].'/www/img/uploads/new';

$image = WideImage::load($file_dist.'/'.$file_name);
$watermark = WideImage::load($watermark_file_dist.'/'.$watermark_file_name);

$new_image = $image->merge($watermark, 'center', 'bottom – 10', 50);
$new_image->saveToFile($new_file_path.'/'.$file_name);*/

//$image = WideImage::load($_SESSION['image_main']);
//$watermark = WideImage::load($_SESSION['image_watermark']);

echo 'img_main -------- '.$_SESSION['image_main'];
echo '<br>img_watermark -------- '.$_SESSION['image_watermark'];

//$new_image = $image->merge($watermark, 'center', 'center', 80);
//$new_image->saveToFile('C:\OpenServer\domains\watermark\www\img\uploads\new\newwithwm.png');