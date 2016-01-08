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
});

