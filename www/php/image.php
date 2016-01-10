<?php
require_once "../../composer.local/vendor/autoload.php";
use \WideImage\WideImage as WideImage;
session_start();

$image = WideImage::load(__DIR__.'\..\img\uploads\main_image.png');
$watermark = WideImage::load(__DIR__.'\..\img\uploads\watermark.png');

$new_image = $image->merge($watermark, 'center', 'bottom – 10', 50);
$new_image->saveToFile(__DIR__.'\..\img\uploads\new_image.png');