<?php
session_start();

$file = $_FILES['files'];
$file_size = $_FILES['upload_img']['size'];
$file_tmp = $_FILES['upload_img']['tmp_name'];
$file_name = $_FILES['upload_img']['name'];
$file_dist = '../img/uploads/'.$file_name;
$file_path = '../img/uploads/';

$watermark_file_size = $_FILES['upload_watermark']['size'];
$watermark_file_tmp = $_FILES['upload_watermark']['tmp_name'];
$watermark_file_name = $_FILES['upload_watermark']['name'];
$watermark_file_dist = '../img/uploads/'.$watermark_file_name;

$imageFileType = pathinfo(basename ($file_name), PATHINFO_EXTENSION);
$watermark_imageFileType = pathinfo(basename ($watermark_file_name), PATHINFO_EXTENSION);

$data = array();

if($file_size>3145728){
    $new_file_size = round($file_size/1048576, 2);
    $data['error_msg'] = 'Размер файла составляет '.$new_file_size.'мб.\nДопускаются файлы не более 3мб.';
    $data['url'] = '';
    echo $data['error_msg'];
    unlink($file_tmp);
    exit;
}

if($file_size==0){
    $data['error_msg'] = 'Вы ничего не загрузили!';
    $data['url'] = '';
    echo $data['error_msg'];
    exit;
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif"){
    $data['error_msg'] = 'Это не картинка! Не нужно ломать нам сервер! >:c';
    $data['url'] = '';
    echo $data['error_msg'];
    exit;
}

if($watermark_file_size>3145728){
    $new_file_size = round($file_size/1048576, 2);
    $data['error_msg'] = 'Размер файла watermark составляет '.$new_file_size.'мб.\nДопускаются файлы watermark не более 3мб.';
    $data['url'] = '';
    echo $data['error_msg'];
    unlink($file_tmp);
    exit;
}

if($watermark_file_size==0){
    $data['error_msg'] = 'Вы ничего не загрузили в watermark!';
    $data['url'] = '';
    echo $data['error_msg'];
    exit;
}

if($watermark_imageFileType != "jpg" && $watermark_imageFileType != "png" && $watermark_imageFileType != "jpeg" && $watermark_imageFileType != "gif"){
    $data['error_msg'] = 'Это не картинка watermark! Не нужно ломать нам сервер! >:c';
    $data['url'] = '';
    echo $data['error_msg'];
    exit;
}

/*----------------------------------------------------------------*/

if(is_uploaded_file($file_tmp)){
    if(move_uploaded_file($file_tmp, $file_dist)){
        $data['msg'] = "Изображение загружено";
        $data['error_msg'] = '';
        $data['url'] = $file_dist;
        $data['name'] = $file_name;
        $file_size = getimagesize($data['url']);
        $data['width'] = $file_size[0]; //ширина
        $data['height'] = $file_size[1]; //высота
        rename($file_path.$file_name, $file_path.'main_image.png');
    }
    else{
        $data['error_msg'] = "Возникла неизвестная ошибка при загрузке изображения!";
        $data['url'] = '';
        exit;
    }
}

if(is_uploaded_file($watermark_file_tmp)){
    if(move_uploaded_file($watermark_file_tmp, $watermark_file_dist)){
        $data['msg'] = "Изображение watermark загружено";
        $data['error_msg'] = '';
        $data['url'] = $watermark_file_dist;
        $data['name'] = $watermark_file_name;
        $watermark_file_size = getimagesize($data['url']);
        $data['width'] = $watermark_file_size[0]; //ширина
        $data['height'] = $watermark_file_size[1]; //высота
        rename($file_path.$watermark_file_name, $file_path.'watermark.png');
    }
    else{
        $data['error_msg'] = "Возникла неизвестная ошибка при загрузке watermark!";
        $data['url'] = '';
        exit;
    }
}

echo $data['message'] = "Все было успешно загружено!";
exit;