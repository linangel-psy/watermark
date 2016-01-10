$('.settings-box__button_reset').click(function () {
	$('.settings__cover').css('height', '510px');
	$('#imgBox').find('img').remove();
	$('.input-upload').text('Выберите картинку');
})