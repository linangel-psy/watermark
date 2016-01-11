// Сохраняем максимальное и минимальное значения спиннеров
var maxX = $("#imgBox").width() - $("#watermarkBox").width();
var maxY = $("#imgBox").height() - $("#watermarkBox").height();

// Определяем перемещение по X
var spinnerX = $( "#x-coordinates" ).spinner({
	spin: function( event, ui ) {
		if ( ui.value <= maxX && ui.value >= 0 ) {
			ui.value += 1;
		}
		else if ( ui.value > maxX ) {
			ui.value = maxX;
		} else if ( ui.value < 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("left", ui.value);
		$('#x-coordinates').attr( "value", ui.value );
	}		
});

// Определяем перемещение по Y
var spinnerY = $( "#y-coordinates" ).spinner({
	spin: function( event, ui ) {
		if ( ui.value <= maxY && ui.value >= 0 ) {
			ui.value -= 1;
		}
		else if ( ui.value > maxY ) {
			ui.value = maxY;
		} else if ( ui.value < 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("top", ui.value);
		$('#y-coordinates').attr( "value", ui.value );
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
