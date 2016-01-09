;var moveModule = (function () {

	var init = function () {
		_setUpListners();
		// do! after initialization
	};

	var _setUpListners = function () {
		// listening 
		$('#position-link').on('click', _changeActiveClass);
	};

	var _changeActiveClass = function () {
		$(this).toggleClass('active');
	};

	return { // public methods
		init: init
	};

})();

moveModule.init();

// $(functio() {

//   $(".settings-box__img-position-coordinates_x").append('<div class="inc button">+</div><div class="dec button">-</div>');

//   $(".button").on("click", function() {

//     var $button = $(this);
//     var oldValue = $button.parent().find("input").val();

//     if ($button.text() == "+") {
//   	  var newVal = parseFloat(oldValue) + 1;
//   	} else {
// 	   // Don't allow decrementing below zero
//       if (oldValue > 0) {
//         var newVal = parseFloat(oldValue) - 1;
// 	    } else {
//         newVal = 0;
//       }
// 	  }

//     $button.parent().find("input").val(newVal);

//   });

// });