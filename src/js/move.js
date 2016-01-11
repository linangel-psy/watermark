$(function() {
  'use strict';
  // Сохраняем максимальное и минимальное значения спиннеров
  var maxX = $("#imgBox").width() - $("#watermarkBox").width();
  var maxY = $("#imgBox").height() - $("#watermarkBox").height();
  // Определяем перемещение по X
  var spinnerX = $( "#x-coordinates" ).spinner({
    spin: function( event, ui ) {
      // Проверка на максимальное значение
      if ( ui.value > maxX ) {
        $( this ).spinner( "value", 0 );
        $("#watermarkBox").css( "left", 0 );
        return false;
      // Проверка на минимальное значение
      } else if ( ui.value < 0 ) {
        $( this ).spinner( "value", maxX );
        $( "#watermarkBox" ).css( "left", maxX );
        return false;
      }
      // Результат ОК - перемещаем по X
      $("#watermarkBox").css("left", ui.value);
      }
  });

  // Определяем перемещение по Y
  var spinnerY = $( "#y-coordinates" ).spinner({
    pin: function( event, ui ) {
    // Проверка на максимальное значение
    if ( ui.value > maxY ) {
      $( this ).spinner( "value", 0 );
      $("#watermarkBox").css( "top", "0" );
      return false;
    // Проверка на минимальное значение
    } else if ( ui.value < 1 ) {
      $( this ).spinner( "value", maxY );
      $("#watermarkBox").css( "top", maxY );
      return false;
    }
    // Результат ОК - ��еремещаем по Y
    $("#watermarkBox").css("top", ui.value);
    }
  });
  
  // Функция для перемещения водяного знака
  $( "#watermarkBox" ).draggable({ 
    containment: "#imgBox", 
    scroll: false,
    drag: function() {
      spinnerX.spinner( "value", parseInt($("#watermarkBox").css("left")) );
      spinnerY.spinner( "value", parseInt($("#watermarkBox").css("top")) );
    }
  });

}());