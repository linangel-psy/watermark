<?php
session_start();
$file_size = $_FILES['upload']['size'];
$file_tmp = $_FILES['upload']['tmp_name'];
$file_name = $_FILES['upload']['name'];
$file_dist = __DIR__.'/downloads/'.$file_name;
$imageFileType = pathinfo(basename ($file_name), PATHINFO_EXTENSION);
function redirectToIndex($message){
    echo "<script type='text/javascript'>alert('$message');window.location.href = \"index.html\";</script>";
}
if($file_size>3145728){
    /*$new_file_size = round($file_size/1048576, 2);
    $message = 'Размер файла составляет '.$new_file_size.'мб.\nДопускаются файлы не более 3мб.';
    redirectToIndex($message);*/
    unlink($file_tmp);
    exit();
}
if($file_size==0){
    /*$message = 'Вы ничего не загрузили!';
    redirectToIndex($message);*/
    exit();
}
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ){
    /*$message = 'Это не картинка!';
    redirectToIndex($message);*/
    exit();
}
if(is_uploaded_file($file_tmp)){
    /*$message = 'Файл успешно загружен!';
    redirectToIndex($message);*/
    move_uploaded_file($file_tmp, $file_dist);
    exit();
}