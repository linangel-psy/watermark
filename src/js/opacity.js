$( ".slider" ).slider({
	value: 60,
	min: 0,
	max: 100,
	slide: function( event, ui ) {
		watermarkOpacity(ui.value);
	}
});

var watermarkOpacity = function(value) {
	var opacity = value / 100;
	$('#watermarkBox').css('opacity', opacity);
	$( "#opacityValue" ).val( opacity );
};
