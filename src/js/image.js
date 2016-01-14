var proportions;
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

	}
	else if (box == '#watermarkBox') {
		position = 'bottom-right';
		$('#bottom-right').addClass('active');
	};
	var insideH = imgH * proportions,
		insideW = imgW * proportions;
	setPosition(box, boxH, boxW, insideH, insideW, position);
	watermarkOpacity($( "#sliderOpacity" ).slider( "value" ));
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
		var valueX = parseInt($("#watermarkBox").css("left")),
			valueY = parseInt($("#watermarkBox").css("top"));
		spinnerX.spinner( "value", valueX );
		spinnerY.spinner( "value", valueY );
		$('#originalX').val(Math.ceil(valueX / proportions));
		$('#originalY').val(Math.ceil(valueY / proportions));
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
