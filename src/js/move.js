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
		if ( ui.value < maxX && ui.value > 0 ) {
			ui.value += 1;
		}
		else if ( ui.value >= maxX ) {
			ui.value = maxX;
		} else if ( ui.value <= 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("left", ui.value);
		$('#coordinatesX').spinner( "value", ui.value );
		$('#originalX').attr('value', Math.ceil(ui.value / proportions));
	}		
});
// Определяем перемещение по Y
var spinnerY = $( "#coordinatesY" ).spinner({
	spin: function( event, ui ) {
		maxY = max[1];
		$( "#coordinatesY" ).spinner({min: 0, max: maxY});
		if ( ui.value < maxY && ui.value > 0 ) {
			ui.value -= 1;
		}
		else if ( ui.value >= maxY ) {
			ui.value = maxY;
		} else if ( ui.value <= 0 ) {
			ui.value = 0;
		}
		$("#watermarkBox").css("top", ui.value);
		$('#coordinatesY').spinner( "value", ui.value );
		$('#originalY').attr('value', Math.ceil(ui.value / proportions));
	}	
});

// Функция для перемещения водяного знака
$( "#watermarkBox" ).draggable({ 
	containment: "#imgBox", 
	scroll: false,
	drag: function() {
		valueX = parseInt($("#watermarkBox").css("left"));
		valueY = parseInt($("#watermarkBox").css("top"));
		setSpinner(valueX, valueY)
	}
});


// Смена вида watermark
$('.settings-box-switch__link').click(function(event){
	event.preventDefault();
	$('.settings-box-switch__link').removeClass('active');
	$(this).addClass('active');
	var allLabel = $('.coordinates-label');
	if ($(this).attr('id') == 'tileSwitch') {
		$(allLabel[0])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-arrow-top');
		$(allLabel[1])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-arrow-left');
		$('.settings-box__list').addClass('active');
		$('.settings-box__link').removeClass('active');
		
		
	}
	else if ($(this).attr('id') == 'oneSwitch') {
		$(allLabel[0])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-x');
		$(allLabel[1])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-y');
		$('.settings-box__list').removeClass('active');
		
	}
});
$('#oneSwitch').trigger('click');