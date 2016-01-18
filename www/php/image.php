<?php
ini_set("memory_limit","256M");
require_once('../PHPImageWorkshop/ImageWorkshop.php');
use PHPImageWorkshop\ImageWorkshop;

$x_coordinates = $_POST['x-original'];
$y_coordinates = $_POST['y-original'];
$slider_opacity = $_POST['opacity']*100;
$main_image_input = $_POST['url_img'];
$watermark_input = $_POST['url_watermark'];
$tile_mode = $_POST['array'];
$tile_mode = explode(",", $tile_mode);

$main_image = ImageWorkshop::initFromPath($main_image_input);
$watermark = ImageWorkshop::initFromPath($watermark_input);

$watermark->opacity($slider_opacity);

list($watermark_width, $watermark_height) = getimagesize($watermark_input);
list($img_width, $img_height) = getimagesize($main_image_input);

$margin_x = $_POST['x-coordinates'];
$margin_y = $_POST['y-coordinates'];

/*
есть инпут с именем array
в нем список значений через запятую
0 - индикатор замощения
1 - координата y
2 - координата x
3 - столбци
4 - строки
*/

$y_coordinates_tiles = $tile_mode[1];
$x_coordinates_tiles = $tile_mode[2];



if($tile_mode[0]==='true') {
    $mx = $y_coordinates;
    $my = $x_coordinates;
    for ($i = 0; $i < $tile_mode[4]; $i++) {
        $y = $tile_mode[1] + $my + $i * ($watermark_height + $my);
        for ($j = 0; $j < $tile_mode[3]; $j++) {
            $x = $tile_mode[2] + $mx + $j * ($watermark_width + $mx);
            $main_image->addLayer(1, $watermark, $x, $y, "LT");
            if ($x + $watermark_width + $mx >= $img_width) {
                break;
            }
        }
        $main_image->mergeAll();
        if ($y + $watermark_height + $my >= $img_height) {
            break;
        }
    }
}else{
    $main_image->addLayer(1, $watermark, $x_coordinates, $y_coordinates, "LT");
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