<?php
require_once "../../composer.local/vendor/autoload.php";
require_once "validation.php";
use \WideImage\WideImage as WideImage;

$image = WideImage::loadFromFile('img_upload');
$watermark = WideImage::loadFromFile('watermark');