$(function() {
  'use strict';
  // Сохраняем максимальное и минимальное значения спиннеров
  var maxX = $("#watermarkBox").width() - $("#imgBox").width();
  var maxY = $("#watermarkBox").height() - $("#imgBox").height();
  // Определяем перемещение по X
  var spinnerX = $( "#x-coordinates" ).spinner({
    spin: function( event, ui ) {
      // Проверка на максимальное значение
      if ( ui.value > maxX ) {
        $( this ).spinner( "value", 0 );
        $("#imgBox").css( "left", 0 );
        return false;
      // Проверка на минимальное значение
      } else if ( ui.value < 0 ) {
        $( this ).spinner( "value", maxX );
        $( "#imgBox" ).css( "left", maxX );
        return false;
      }
      // Результат ОК - перемещаем по X
      $("#imgBox").css("left", ui.value);
      }
  });

  // Определяем перемещение по Y
  var spinnerY = $( "#y-coordinates" ).spinner({
    pin: function( event, ui ) {
    // Проверка на максимальное значение
    if ( ui.value > maxY ) {
      $( this ).spinner( "value", 0 );
      $("#imgBox").css( "top", "0" );
      return false;
    // Проверка на минимальное значение
    } else if ( ui.value < 1 ) {
      $( this ).spinner( "value", maxY );
      $("#imgBox").css( "top", maxY );
      return false;
    }
    // Результат ОК - ��еремещаем по Y
    $("#imgBox").css("top", ui.value);
    }
  });
  
  // Функция для перемещения водяного знака
  $( "#imgBox" ).draggable({ 
    containment: "#watermarkBox", 
    scroll: false,
    drag: function() {
      spinnerX.spinner( "value", parseInt($("#imgBox").css("left")) );
      spinnerY.spinner( "value", parseInt($("#imgBox").css("top")) );
    }
  });

}());