var spinPositionLeft = 'left',
	spinPositionTop = 'top',
	saveMarginTop = 0,
	saveMarginLeft = 0,
	saveLeft = 0,
	saveTop = 0,
	phpArray = new Array(),
	max = new Array();

// Сохраняем максимальное и минимальное значения спиннеров
var setMax = function() {
	var maxX = $("#imgBox").width() - $("#watermarkBox").width();
	var maxY = $("#imgBox").height() - $("#watermarkBox").height();
	$( "#coordinatesX" ).spinner('option', 'max', maxX);
	$( "#coordinatesY" ).spinner('option', 'max', maxY);
	max = [maxX, maxY];
};

// Определяем перемещение по X
var spinnerX = $( "#coordinatesX" ).spinner({
	min: 0,
	spin: function( event, ui ) {
		maxX = max[0];
		if ( ui.value < maxX && ui.value > 0 ) {
			ui.value += 1;
		}
		else if ( ui.value >= maxX ) {
			ui.value = maxX;
		} else if ( ui.value <= 0 ) {
			ui.value = 0;
		}
		$('#coordinatesX').spinner( "value", ui.value );
		$('#originalX').attr('value', ui.value / proportions);

		if ($('.settings-box-switch__link_tile').hasClass('active')) {
			$('.tiling-wide img').css('margin-top', ui.value);
			$('.cover-box__line_horisontal').css('height', ui.value + 1);
			phpArray[4] = Math.ceil(parseInt($('.tiling-wide').height()) / (parseInt($('.tiling-wide img').height()) + parseInt($('.tiling-wide img').css('margin-top')))) - 1;
			$('#array').val(phpArray);
		}
		else {
			$("#watermarkBox").css(spinPositionLeft, ui.value);			
		}
	}		
});
// Определяем перемещение по Y
var spinnerY = $( "#coordinatesY" ).spinner({
	min: 0,
	spin: function( event, ui ) {
		maxY = max[1];
		if ( ui.value < maxY && ui.value > 0 ) {
			ui.value -= 1;
		}
		else if ( ui.value >= maxY ) {
			ui.value = maxY;
		} else if ( ui.value <= 0 ) {
			ui.value = 0;
		}
		$('#coordinatesY').spinner( "value", ui.value );
		$('#originalY').attr('value', ui.value / proportions);

		if($('.settings-box-switch__link_tile').hasClass('active')) {
			$('.tiling-wide img').css('margin-left', ui.value);
			$('.cover-box__line_vertical').css('width', ui.value + 1);
			phpArray[3] = Math.ceil(parseInt($('.tiling-wide').width()) / (parseInt($('.tiling-wide img').width()) + parseInt($('.tiling-wide img').css('margin-left')))) - 1;
			$('#array').val(phpArray);
		}
		else {
			$("#watermarkBox").css(spinPositionTop, ui.value);
		}
	}	
});

function checkActiveView() {
	if($('.settings-box-switch__link_tile').hasClass('active')){
		var mainWidth = $('#imgBox').width(),
			mainHeight = $('#imgBox').height(),
			imgForTiling = $("#watermarkBox img"),
			imgForTilingW = $(imgForTiling).width(),
			imgForTilingH = $(imgForTiling).height(),
			imgParentH = $("#imgBox").height(),
			imgParentW = $("#imgBox").width(),

			numbCol = Math.ceil(mainWidth * 3 / (imgForTilingW)), // количество колонок
			numbRows = Math.ceil(mainHeight * 3 / (imgForTilingH)),
			numbImages = numbCol * numbRows; // какое количество картинок вставлять
			phpArray[3] = numbCol;
			phpArray[4] = numbRows;
			$('#array').val(phpArray);

		$('#watermarkBox').children('img').css({'width': imgForTilingW, 'height': imgForTilingH}); //теперь пропорции watermark не пропадают!

		if ($('.tiling-wide').length == 0) {
			$("#watermarkBox").wrapInner("<div class='tiling-wide'></div>");
		}
		$('.tiling-wide').css({
			height: mainWidth * 3,
			width: mainHeight * 3
		})
		$("#watermarkBox").css({
			height: mainWidth * 3,
			width: mainHeight * 3
		})

		for (var l = 0; l < (numbImages - 1); l++) {
			$(imgForTiling).clone().insertAfter(imgForTiling);
		}
	}
};


// Смена вида watermark
$('.settings-box-switch__link').click(function(event){
	event.preventDefault();
	$('.settings-box-switch__link').removeClass('active');
	$(this).addClass('active');
	var allLabel = $('.coordinates-label');

	if ($(this).attr('id') == 'tileSwitch') {
		phpArray[0] = true;
		$('#array').val(phpArray);

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
		phpArray[1] = parseInt($( "#watermarkBox" ).css('top'));
		phpArray[2] = parseInt($( "#watermarkBox" ).css('left'));
		$('.tiling-wide img').css({'margin-top':saveMarginTop,'margin-left':saveMarginLeft});
		max = [80, 80];
		$( "#coordinatesX" ).spinner('option', 'max', max[0]);
		$( "#coordinatesY" ).spinner('option', 'max', max[1]);
		setSpinner(saveMarginLeft, saveMarginTop);

		// Функция для перемещения водяного знака
		$( "#watermarkBox" ).draggable({ 
			containment: false, 
			scroll: false,
			drag: function() {
				phpArray[1] = parseInt($( "#watermarkBox" ).css('top'));
				phpArray[2] = parseInt($( "#watermarkBox" ).css('left'));
				$('#array').val(phpArray);
			}
		});
		
		checkActiveView();
		

	} else if ($(this).attr('id') == 'oneSwitch') {
		phpArray[0] = false;
		$('#array').val(phpArray);

		$(allLabel[0])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-x');
		$(allLabel[1])
			.attr('class', 'coordinates-label')
			.addClass('coordinates-label-y');

		$('.settings-box__list').removeClass('active');

		spinPositionLeft = 'left';
		spinPositionTop = 'top';
		if (parseInt($('.tiling-wide img').css('margin-top'))) {
			saveMarginTop = parseInt($('.tiling-wide img').css('margin-top'));
			saveMarginLeft = parseInt($('.tiling-wide img').css('margin-left'));
		};

		$("#watermarkBox img").css({'margin-top':0,'margin-left':0});
		$("#watermarkBox").css({'top':saveTop,'left':saveLeft});
		$("#watermarkBox").css({
			width: watermarkWidth,
			height: watermarkHeight
		})
		$('.tiling-wide').css({
			width: '100%',
			height: '100%'
		})
		setMax();
		setSpinner(saveLeft, saveTop);

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
		
		// удаляем нафиг все картинки, кроме первой
		$("#watermarkBox img:gt(0)").remove();
	}
});