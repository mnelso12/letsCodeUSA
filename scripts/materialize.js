$(document).ready(function(){
	$('.parallax').parallax();
	$('.modal').modal();

	var options = [
		{selector: '#categories', offset: 50, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} },

		{selector: '#books-list', offset: 50, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} },

		{selector: '#computational-thinking-list', offset: 50, callback: function(el) {
			Materialize.showStaggeredList($(el));
		} }
	];
	Materialize.scrollFire(options);
});


