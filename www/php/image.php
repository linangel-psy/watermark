<?php

require_once('../PHPImageWorkshop/ImageWorkshop.php');
use PHPImageWorkshop\ImageWorkshop;

$x_coordinates = $_POST['x-original'];
$y_coordinates = $_POST['y-original'];
$slider_opacity = $_POST['opacity']*100;
$main_image_input = $_POST['url_img'];
$watermark_input = $_POST['url_watermark'];

$main_image = ImageWorkshop::initFromPath($main_image_input);
$watermark = ImageWorkshop::initFromPath($watermark_input);

$watermark->opacity($slider_opacity);
$main_image->addLayer(1, $watermark, $x_coordinates, $y_coordinates, "LT");

$random = rand(0, getrandmax());

$dirPath = $_SERVER['DOCUMENT_ROOT'].'/www/img/uploads/';
$filename = 'team6-'.$random.'.png';
$createFolders = false;
$imageQuality = 50;

$main_image->save($dirPath, $filename, $createFolders, $imageQuality);

/*
list($main_image_width, $main_image_height) = getimagesize($main_image_path);
list($watermark_width, $watermark_height) = getimagesize($watermark_path);

if($main_image_width>650){
    $uploaded_main_image_width = $x_coordinates + $watermark_width;
    $coefficient = $main_image_width/$uploaded_main_image_width;
}

else if($main_image_height>530 && !$coefficient){
    $uploaded_main_image_height = $y_coordinates + $watermark_height;
    $coefficient = $main_image_height/$uploaded_main_image_height;
}

else{
    $coefficient = 1;
}
*/

$main_image = $_SERVER['DOCUMENT_ROOT'].'/www/img/uploads/'.$filename;

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename($main_image));
header('Content-Length: '.filesize($main_image));

readfile($main_image);

array_map( "unlink", glob('../img/uploads/*') );

header('Location: '.$_SERVER['DOCUMENT_ROOT'].'/www/');

exit;