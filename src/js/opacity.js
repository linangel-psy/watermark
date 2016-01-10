$( ".slider" ).slider({
	range: "min",
	value: 60,
	min: 0,
	max: 100,
	slide: function( event, ui ) {
		$( "#opacityValue" ).val( ui.value );
	}
});
$( "#opacityValue" ).val( $( "#sliderOpacity" ).slider( "value" ) );

var watermarkOpacity = function() {
	var opacity = $( "#sliderOpacity" ).slider( "value" ) / 100;
	$('#watermarkBox').css('opacity', opacity);
	$( "#opacityValue" ).val( $( "#sliderOpacity" ).slider( "value" ) );
};
$( ".slider" ).slider({
	slide: function( event, ui ) {
		watermarkOpacity();
	}
});
