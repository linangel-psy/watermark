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
			setPosition(box, boxH, boxW, height, boxW);
		} else {
			var width = (boxH / imgH) * imgW;
			setBoxSize(box, boxH, width);
			setPosition(box, boxH, boxW, boxH, width);
		}
	};
};

var setBoxSize = function(box, insideH, insideW) {
	$(box).css({
		'height': insideH,
		'width': insideW
	});
};

var setPosition = function(box, outH, outW, insideH, insideW) {
	var top = (outH - insideH) / 2,
	left = (outW - insideW) / 2;
	$(box).find('img').css({
		'top': top,
		'left': left
	});
};
