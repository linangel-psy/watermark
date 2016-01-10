var imgSizeCalculation = function(box, boxH, boxW, imgH, imgW) {
	var proportionsH = imgH / boxH,
		proportionsW = imgW / boxW;
	if (proportionsH < 1 && proportionsW < 1) {
		setBoxSize(box, imgH, imgW);
		setPosition(box, boxH, boxW, imgH, imgW);
	} else {
		if (proportionsW > proportionsH) {
			var height = (boxW / imgW) * imgH;
			setBoxSize(box, height, boxW);
			setPosition(box, boxH, boxW, height, boxW, 'middle-middle');
		} else {
			var width = (boxH / imgH) * imgW;
			setBoxSize(box, boxH, width);
			setPosition(box, boxH, boxW, boxH, width, 'middle-middle');
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
			$(box).css({
				'top': 0,
				'left': 0
			});
			break;
		case 'top-middle':
			$(box).css({
				'top': 0,
				'left': (outW - insideW) / 2
			});
			break;
		case 'top-right':
			$(box).css({
				'top': 0,
				'left': (outW - insideW)
			});
			break;
		case 'middle-left':
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': 0
			});
			break;
		case 'middle-middle':
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': (outW - insideW) / 2
			});
			break;
		case 'middle-right':
			$(box).css({
				'top': (outH - insideH) / 2,
				'left': (outW - insideW)
			});
			break;
		case 'bottom-left':
			$(box).css({
				'top': (outH - insideH),
				'left': 0
			});
			break;
		case 'bottom-middle':
			$(box).css({
				'top': (outH - insideH),
				'left': (outW - insideW) / 2
			});
			break;
		case 'bottom-right':
			$(box).css({
				'top': (outH - insideH),
				'left': (outW - insideW)
			});
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
