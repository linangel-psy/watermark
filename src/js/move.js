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
		$('#coordinatesX').spinner( "value", ui.value );
		$('#originalX').attr('value', Math.ceil(ui.value / proportions));

		if ($('.settings-box-switch__link_tile').hasClass('active')) {
			$('.tiling-wide img').css('margin-top', ui.value);
			$('.cover-box__line_horisontal').css('height', ui.value + 1);
		}
		else {
			$("#watermarkBox").css(spinPositionLeft, ui.value);			
		}
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
		$('#coordinatesY').spinner( "value", ui.value );
		$('#originalY').attr('value', Math.ceil(ui.value / proportions));

		if($('.settings-box-switch__link_tile').hasClass('active')) {
			$('.tiling-wide img').css('margin-left', ui.value);
			$('.cover-box__line_vertical').css('width', ui.value + 1);
		}
		else {
			$("#watermarkBox").css(spinPositionTop, ui.value);
		}
	}	
});

function checkActiveView() {
	if($('.settings-box-switch__link_tile').hasClass('active')){
		var mainWidth = $('.workarea-box').width(),

			imgForTiling = $("#watermarkBox img"),
			imgForTilingW = $(imgForTiling).width(),
			imgForTilingH = $(imgForTiling).height(),
			imgParentH = $("#imgBox").children('img').height(),
			imgParentW = $("#imgBox").children('img').width(),

			numbCol = Math.ceil(imgParentW / imgForTilingW) + 2, // количество колонок
			numbRows = Math.ceil(imgParentH / imgForTilingH) + 2,
			numbImages = numbCol * numbRows, // какое количество картинок вставлять
			ifExist = $("#watermarkBox div").is(".tiling-wide");
		$('#watermarkBox').children('img').css({'width': imgForTilingW, 'height': imgForTilingH}); //теперь пропорции watermark не пропадают!

		$("#watermarkBox").wrapInner("<div class='tiling-wide'></div>");
		$('.tiling-wide').css({
			height: mainWidth * 2,
			width: mainWidth * 2
		})

		for (var l = 0; l < numbImages; l++) {
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
		$('.tiling-wide img').css({'margin-top':saveMarginTop,'margin-left':saveMarginLeft});
		max = [80, 80];
		setSpinner(saveMarginLeft, saveMarginTop);

		// Функция для перемещения водяного знака
		$( "#watermarkBox" ).draggable({ 
			containment: false, 
			scroll: false,
			drag: function() {}
		});
		
		checkActiveView();
		

	} else if ($(this).attr('id') == 'oneSwitch') {

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
		
		$('.tiling-wide').css({
			width: '100%',
			height: '100%'
		})

	}
});
