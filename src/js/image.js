var imgSizeCalculation = function(box, boxH, boxW, imgH, imgW) {
	var position;
	if (box == '#imgBox') {
		position = 'middle-middle';
	}
	else if (box == '#watermarkBox') {
		position = 'bottom-right';
		$('#bottom-right').addClass('active');
	};
	var proportionsH = imgH / boxH,
		proportionsW = imgW / boxW;
	if (proportionsH < 1 && proportionsW < 1) {
		setBoxSize(box, imgH, imgW);
		setPosition(box, boxH, boxW, imgH, imgW, position);
		watermarkOpacity($( "#sliderOpacity" ).slider( "value" ));
	} else {
		if (proportionsW > proportionsH) {
			var height = (boxW / imgW) * imgH;
			setBoxSize(box, height, boxW);
			setPosition(box, boxH, boxW, height, boxW, position);
			watermarkOpacity($( "#sliderOpacity" ).slider( "value" ));
		} else {
			var width = (boxH / imgH) * imgW;
			setBoxSize(box, boxH, width);
			setPosition(box, boxH, boxW, boxH, width, position);
			watermarkOpacity($( "#sliderOpacity" ).slider( "value" ));
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
		spinnerX.spinner( "value", parseInt($("#watermarkBox").css("left")) );
		spinnerY.spinner( "value", parseInt($("#watermarkBox").css("top")) );
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