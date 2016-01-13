var language = {
	ru: { 
		text: {
			'title': 'Генератор водяных знаков',
			'#header': 'Генератор водяных знаков',
			'#asideTitle': 'Настройки',
			'#uploadOrigin': 'Исходное изображение',
			'#uploadWatermark': 'Водяной знак',
			'.loadImg': 'Выберите картинку',
			'#position': 'Положение',
			'#opacity': 'Прозрачность',
			'#footer': '© 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его'
		},
		buttons: {
			'#submit': 'Скачать',
			'#reset': 'Сброс'
		}
	},
	en: {
		text: {
			'title': 'Watermarks generator',
			'#header': 'Watermark generator',
			'#asideTitle': 'Settings',
			'#uploadOrigin': 'Original image',
			'#uploadWatermark': 'Watermark',
			'.loadImg': 'Choose an image',
			'#position': 'Position',
			'#opacity': 'Transparency',
			'#footer': '© 2016, This is my webpage. Please, do not copy or steal it'
		},
		buttons: {
			'#submit': 'Download',
			'#reset': 'Reset'
		}
	}
};
var setLanguage = function(lang){
	for (var key in lang.text){
		$(key).empty().text(lang.text[key]);
	}
	for (var key in lang.buttons){
		$(key).val(lang.buttons[key]);
	};
};

$(document).ready(function() {
	$('.lang-block').click(function(){
		setLanguage(language[$(this).attr('id')]);
	});
});
