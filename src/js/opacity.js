$(document).ready(function (){
	$( ".slider" ).slider({
		range: "min",
		value: 100,
		min: 10,
		max: 100,
		slide: function( event, ui ) {
			$( "#amount" ).val( "$" + ui.value );
		}
	});
	$( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );

	var watermarkOpacity = function() {
		var opacity = parseInt($('.ui-slider-range').css('width')) / 220;
		$('#watermarkBox').css('opacity', opacity);
	};
	$( ".slider" ).slider({
		slide: function( event, ui ) {
			watermarkOpacity();
		}
	});
});