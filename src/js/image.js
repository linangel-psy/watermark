var proportions, valueX, valueY, watermarkHeight, watermarkWidth;
var imgSizeCalculation = function(box, boxH, boxW, imgH, imgW) {
	var position;
	if (box == '#imgBox') {
		position = 'middle-middle';
		var proportionsH = imgH / boxH,
			proportionsW = imgW / boxW;
		if (proportionsH < 1 && proportionsW < 1) {
			proportions = 1
		} else {
			if (proportionsW > proportionsH) {
				proportions = boxW / imgW
			} else {
				proportions = boxH / imgH
			}
		};

	} else if (box == '#watermarkBox') {
		position = 'bottom-right';
		$('.settings-box__link').removeClass('active');
		$('#bottom-right').addClass('active');
		setTimeout(function() {
			$('.settings-box__link').removeClass('active');
		}, 800);
		$('#oneSwitch').trigger('click');
		saveMarginTop = 0;
		saveMarginLeft = 0;
		saveLeft = 0;
		saveTop = 0;
	};
	var insideH = imgH * proportions,
		insideW = imgW * proportions;
	watermarkHeight = insideH;
	watermarkWidth = insideW;
	setPosition(box, boxH, boxW, insideH, insideW, position);
	watermarkOpacity($('#sliderOpacity').slider('value'));
	$(box).css({
		'height': insideH,
		'width': insideW
	});
};

var setPosition = function(box, outH, outW, insideH, insideW, id) {
	outW = parseInt(outW);
	outH = parseInt(outH);
	insideW = parseInt(insideW);
	insideH = parseInt(insideH);
	switch (id) {
		case 'top-left':
			var top = 0,
				left = 0;
			$(box).css({
				'top': 0,
				'left': 0
			});
			break;
		case 'top-middle':
			var top = 0,
				left = Math.round((outW - insideW) / 2);
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'top-right':
			var top = 0,
				left = Math.round((outW - insideW));
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'middle-left':
			var top = Math.round((outH - insideH) / 2),
				left = 0;
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'middle-middle':
			var top = Math.round((outH - insideH) / 2),
				left = Math.round((outW - insideW) / 2);
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'middle-right':
			var top = Math.round((outH - insideH) / 2),
				left = Math.round((outW - insideW));
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'bottom-left':
			var top = Math.round((outH - insideH)),
				left = 0;
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'bottom-middle':
			var top = Math.round((outH - insideH)),
				left = Math.round((outW - insideW) / 2);
			$(box).css({
				'top': top,
				'left': left
			});
			break;
		case 'bottom-right':
			var top = Math.round((outH - insideH)),
				left = Math.round((outW - insideW));
			$(box).css({
				'top': top,
				'left': left
			});
			break;
	}
	if (box == '#watermarkBox') {
		valueX = parseInt($('#watermarkBox').css('left'));
		valueY = parseInt($('#watermarkBox').css('top'));
		setSpinner(valueX, valueY)
	}
};
var setSpinner = function(valueX, valueY) {
	if (valueX < 0) {
		valueX = 0;
	};
	if (valueY < 0) {
		valueY = 0;
	};
	spinnerX.spinner('value', valueX);
	spinnerY.spinner('value', valueY);
	$('#originalX').attr('value', Math.ceil(valueX / proportions));
	$('#originalY').attr('value', Math.ceil(valueY / proportions));
};

$('.settings-box__link').click(function(event) {
	event.preventDefault();
	$('.settings-box__link').removeClass('active');
	$(this).addClass('active');
	setTimeout(function() {
		$('.settings-box__link').removeClass('active');
	}, 800);
	var id = $(this).attr('id'),
		outH = $('.img-box').css('height'),
		outW = $('.img-box').css('width'),
		insideH = $('.watermark-box').css('height'),
		insideW = $('.watermark-box').css('width');
	setPosition('#watermarkBox', outH, outW, insideH, insideW, id)
})
