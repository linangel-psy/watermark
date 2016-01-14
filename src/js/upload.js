;( function( $, window, document, undefined ) {
	$('.input-image').each(function () {
		$('.input-image').on('change', function(e) {
			var fileName = '',
				$input = $(this),
				$label = $input.next('label'),
				labelVal = $label.html();
			if (e.target.value) {
				fileName = e.target.value.split('\\').pop();
			}
			if (fileName) {
				$label.find('.input-upload').val(fileName);
			} else {
				$label.html(labelVal);
			}
		});
	});
})(jQuery, window, document);


$(document).ready(function() {
	
	filesUpload('#upload_img', 'main', '#imgBox'); // 1. инпут, на который ставить upload; 2. Функция очистки после повторной загрузки
	filesUpload('#upload_watermark', 'child', '#watermarkBox'); // 3. Элемент, куда вставлять картинку
});


function filesUpload(elem, clearElem, placeToPaste) {
	var elem = elem,
		clearElem = clearElem,
		placeToPaste = placeToPaste;
	$(elem).fileupload({
		dataType: 'json',
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		maxFileSize: 999000
	}).on('fileuploadprocessalways', function (e, data) {
		clearBlocks(clearElem);
		var file = data.files;
		
		if (file.error) {
			alertFileType('Неверный формат файла');
			if (placeToPaste == '#imgBox') {
				$('.settings__cover').css('height', '520px');
			} else {
				$('.settings__cover').css('height', '440px');
			}
		}
	}).on('fileuploadprogressall', function (e, data) {
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$('.progress-bar').show().css(
			'width',
			progress + '%'
		);
		setTimeout(function() {
			$('.progress-bar').fadeOut(300);
		}, 2000);
	}).on('fileuploaddone', function (e, data) {
		clearBlocks(clearElem);
		$.each(data.result.files, function (index, file) {
			if (placeToPaste == '#imgBox') {
				$('.settings__cover').css('height', '440px');
			} else {
				$('.settings__cover').css('height', '0');
			}
			
			if (file.url) {
				var imgMain = $('<img>')
					.attr('src', file.url)
					.load(function() {
						imgW = this.width;
						imgH = this.height;
						boxH = parseInt($(placeToPaste).parent().css('height'));
						boxW = parseInt($(placeToPaste).parent().css('width'));
						imgSizeCalculation(placeToPaste, boxH, boxW, imgH, imgW);
						$(placeToPaste).append(imgMain);
						setMax();
					});
				if (placeToPaste == '#imgBox') {
					$('#urlImg').val(file.url);
				}
				else {
					$('#urlWatermark').val(file.url);
				}
				
			} else if (file.error) {
				alertFileType('Произошла ошибка. Повторите еще раз!');
			}
		});
	});
}

function alertFileType(text) {
	$('.alertFileType')
		.text(text)
		.fadeIn(200);
	setTimeout(function() {
		$('.alertFileType')
			.fadeOut(200)
			.text('');
	}, 3000);
}
function clearBlocks(clearElem) {
	var clearElem = clearElem;
	if (clearElem == 'main') {
		$('#imgBox').find('*').not('.watermark-box').remove();
	} else {
		$('#watermarkBox').find('*').remove();
	}
}