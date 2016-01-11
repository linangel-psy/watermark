// Сохраняем максимальное и минимальное значения спиннеров
var setMax = function() {
	var maxX = $("#imgBox").width() - $("#watermarkBox").width();
	var maxY = $("#imgBox").height() - $("#watermarkBox").height();
	max = [maxX, maxY];
	return max;
};

// Определяем перемещение по X
var spinnerX = $( "#coordinatesX" ).spinner({
	spin: function( event, ui ) {
		maxX = max[0];
		$( "#coordinatesX" ).spinner({min: 0, max: maxX});
		if ( ui.value <= maxX && ui.value >= 0 ) {
			ui.value += 1;
		}
		else if ( ui.value > maxX ) {
			ui.value = maxX;
		} else if ( ui.value < 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("left", ui.value);
		$('#coordinatesX').spinner( "value", ui.value );
	}		
});

// Определяем перемещение по Y
var spinnerY = $( "#coordinatesY" ).spinner({
	spin: function( event, ui ) {
		maxY = max[1];
		$( "#coordinatesY" ).spinner({min: 0, max: maxY});
		if ( ui.value <= maxY && ui.value >= 0 ) {
			ui.value -= 1;
		}
		else if ( ui.value > maxY ) {
			ui.value = maxY;
		} else if ( ui.value < 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("top", ui.value);
		$('#coordinatesY').spinner( "value", ui.value );
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
