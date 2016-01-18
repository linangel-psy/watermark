var language = {
	ru: { 
		text: {
			'title': 'Генератор водяных знаков',
			'#header': 'Генератор водяных знаков',
			'#asideTitle': 'Настройки',
			'#uploadOrigin': 'Исходное изображение',
			'#uploadWatermark': 'Водяной знак',
			'#position': 'Положение',
			'#opacity': 'Прозрачность',
			'#footer': '© 2016, Это мой сайт, пожалуйста, не копируйте и не воруйте его'
		},
		buttons: {
			'#submit': 'Скачать',
			'#reset': 'Сброс'
		},
		placeholder: {
			'.input-upload': 'Выберите картинку',
		},
		alerts: {
			'alert': 'Загруженный водяной знак больше основного изображения. Выберете другйю картинку.'
		}
	},
	en: {
		text: {
			'title': 'Watermarks generator',
			'#header': 'Watermark generator',
			'#asideTitle': 'Settings',
			'#uploadOrigin': 'Original image',
			'#uploadWatermark': 'Watermark',
			'#position': 'Position',
			'#opacity': 'Transparency',
			'#footer': '© 2016, This is my webpage. Please, do not copy or steal it'
		},
		buttons: {
			'#submit': 'Download',
			'#reset': 'Reset'
		},
		placeholder: {
			'.input-upload': 'Choose an image',
		},
		alerts: {
			'alert': 'Loaded watermark is larger than main image. Choose anoter image.'
		}
	}
};
var setCookie = function(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	var updatedCookie = name + "=" + value;
	document.cookie = updatedCookie;
};

var deleteCookie = function(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

var getCookie = function(name) {
	var matches = document.cookie;
	var str = name + '='
	var langIndex = matches.indexOf(str) + str.length
	var lang = matches.substring(langIndex, langIndex + 3);
	return matches ? lang : 'ru';
}

var setLanguage = function(lang){
	for (var key in lang.text){
		$(key).empty().text(lang.text[key]);
	}
	for (var key in lang.buttons){
		$(key).val(lang.buttons[key]);
	};
	for (var key in lang.placeholder){
		$(key).attr('placeholder',lang.placeholder[key]);
	};
};

$(document).ready(function() {
	$('.lang-block').click(function(){
		var id = $(this).attr('id');
		deleteCookie('language');
		setCookie('language', id, {expires: 3600});
		setLanguage(language[id]);
	});
	setLanguage(language[getCookie('language')]);
});
