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

list($watermark_width, $watermark_height) = getimagesize($watermark_input);

$margin_x = $x_coordinates;
$margin_y = $y_coordinates;
$watermark_rows;
$watermark_cols;
for($i=1; $i<=$watermark_rows; $i++){
        for($k=1; $k<$watermark_cols; $k++) {
            $main_image->addLayer(1, $watermark, $x_coordinates, $y_coordinates, "LT");
            $x_coordinates = $x_coordinates + $watermark_width + $margin_x;
        }
    $main_image->addLayer(1, $watermark, $x_coordinates, $y_coordinates, "LT");
    $y_coordinates = $y_coordinates + $watermark_height + $margin_y;
    $x_coordinates = $margin_x;
}

$random = rand(0, getrandmax());

$dirPath = '../img/uploads/';
$filename = 'team6-'.$random.'.png';

$main_image->save($dirPath, $filename, false, 100);

$main_image = '../img/uploads/'.$filename;

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.basename($main_image));
header('Content-Length: '.filesize($main_image));

readfile($main_image);

header('Location: '.$_SERVER['DOCUMENT_ROOT'].'/www/');

exit;