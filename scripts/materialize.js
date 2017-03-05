$(document).ready(function(){
	$('.parallax').parallax();

	var options = [
		{selector: '#categories', offset: 50, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} },

		{selector: '#books-list', offset: 1000, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} },

		{selector: '#computational-thinking-list', offset: 1500, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} }
	];
	Materialize.scrollFire(options);
});


