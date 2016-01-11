<?php
require_once "../composer.local/vendor/autoload.php";
use \WideImage\WideImage as WideImage;
session_start();

$x_coordinates = $_POST['x-coordinates'];
$y_coordinates = $_POST['y-coordinates'];
$slider_opacity = $_POST['opacity'];

$image = WideImage::load(__DIR__.'\..\img\uploads\main_image.png');
$watermark = WideImage::load(__DIR__.'\..\img\uploads\watermark.png');

$new_image = $image->merge($watermark, $x_coordinates, $y_coordinates, $slider_opacity);
$new_image->saveToFile(__DIR__.'\..\img\uploads\new_image.png');