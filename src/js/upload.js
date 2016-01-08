//'use strict';
//
//;( function( $, window, document, undefined )
//  {
//	$( '.input-image' ).each( function()
//						   {
//		var $input	 = $( this ),
//			$label	 = $input.next( 'label' ),
//			labelVal = $label.html();
//
//		$input.on( 'change', function( e )
//				  {
//			var fileName = '';
//			console.log (e.target.value);
//			if( e.target.value )
//				fileName = e.target.value.split( '\\' ).pop();
//
//			if( fileName )
//				$label.find( '.input-upload' ).html( fileName );
//			else
//				$label.html( labelVal );
//		});
//
//	});
//})( jQuery, window, document );

;( function( $, window, document, undefined ) {
	$('.input-image').each( function() {
		$('.input-image').on('change', function(e) {
			var fileName = '',
				$input = $(this),
				$label = $input.next('label'),
				labelVal = $label.html();
			if (e.target.value) {
				fileName = e.target.value.split('\\').pop();
			}
			if (fileName) {
				$label.find('.input-upload').html(fileName);
			} else {
				$label.html( labelVal );
			}
		})
	});
})( jQuery, window, document );