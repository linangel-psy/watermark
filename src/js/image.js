var imgSizeCalculation = function(box, boxH, boxW, imgH, imgW) {
	var proportionsH = imgH / boxH,
		proportionsW = imgW / boxW;
	if (proportionsH < 1 && proportionsW < 1) {
		setBoxSize(box, imgH, imgW);
		setPosition(box, boxH, boxW, imgH, imgW, 'bottom-right');
		watermarkOpacity();
	} else {
		if (proportionsW > proportionsH) {
			var height = (boxW / imgW) * imgH;
			setBoxSize(box, height, boxW);
			setPosition(box, boxH, boxW, height, boxW, 'bottom-right');
			watermarkOpacity();
		} else {
			var width = (boxH / imgH) * imgW;
			setBoxSize(box, boxH, width);
			setPosition(box, boxH, boxW, boxH, width, 'bottom-right');
			watermarkOpacity();
		}
	};
};

var setBoxSize = function(box, insideH, insideW) {
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
	switch(id) {
		case 'top-left':
			var top = 0,
				left = 0;
			$(box).css({
				'top': 0,
				'left': 0
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'top-middle':
			var top = 0,
				left = (outW - insideW) / 2;
			$(box).css({
				'top': 0,
				'left': (outW - insideW) / 2
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'top-right':
			var top = 0,
				left = (outW - insideW);
			$(box).css({
				'top': 0,
				'left': (outW - insideW)
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'middle-left':
			var top = (outH - insideH) / 2,
				left = 0;
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': 0
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'middle-middle':
			var top = (outH - insideH) / 2,
				left = (outW - insideW) / 2;
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': (outW - insideW) / 2
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'middle-right':
			var top = (outH - insideH) / 2,
				left = (outW - insideW);
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': (outW - insideW)
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'bottom-left':
			var top = (outH - insideH),
				left = 0;
			$(box).css({
				'top': (outH - insideH),
				'left': 0
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'bottom-middle':
			var top = (outH - insideH),
				left = (outW - insideW) / 2;
			$(box).css({
				'top': (outH - insideH),
				'left': (outW - insideW) / 2
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
		case 'bottom-right':
			var top = (outH - insideH),
				left = (outW - insideW);
			$(box).css({
				'top': (outH - insideH),
				'left': (outW - insideW)
			});
			$('.settings-box__input_x').attr('value', left);
			$('.settings-box__input_y').attr('value', top);
			break;
	}
};

$('.settings-box__link').click(function(event){
	event.preventDefault();
	$('.settings-box__link').removeClass('active');
	$(this).addClass('active');
	var id = $(this).attr('id'),
		outH = $('.img-box').css('height'),
		outW = $('.img-box').css('width'),
		insideH = $('.watermark-box').css('height'),
		insideW = $('.watermark-box').css('width');
	setPosition('#watermarkBox', outH, outW, insideH, insideW, id)
})