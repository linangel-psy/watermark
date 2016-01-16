var spinPositionLeft = 'left',
	spinPositionTop = 'top',
	saveMarginTop = 0,
	saveMarginLeft = 0,
	saveLeft = 0,
	saveTop = 0;

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
		$("#watermarkBox").css(spinPositionLeft, ui.value);
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
		$("#watermarkBox").css(spinPositionTop, ui.value);
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
		setSpinner(valueX, valueY);
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
		spinPositionLeft = 'margin-left';
		spinPositionTop = 'margin-top';
		saveLeft = parseInt($("#watermarkBox").css('left'));
		saveTop = parseInt($("#watermarkBox").css('top'));
		$("#watermarkBox").css({'top':0,'left':0});
		$("#watermarkBox").css({'margin-top':saveMarginTop,'margin-left':saveMarginLeft});
		setSpinner(saveMarginLeft, saveMarginTop);
	}
	else if ($(this).attr('id') == 'oneSwitch') {
		$(allLabel[0])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-x');
		$(allLabel[1])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-y');
		$('.settings-box__list').removeClass('active');
		spinPositionLeft = 'left';
		spinPositionTop = 'top';
		saveMarginTop = parseInt($("#watermarkBox").css('margin-top'));
		saveMarginLeft = parseInt($("#watermarkBox").css('margin-left'));
		$("#watermarkBox").css({'margin-top':0,'margin-left':0});
		$("#watermarkBox").css({'top':saveTop,'left':saveLeft});
		setSpinner(saveLeft, saveTop);
	}
});
