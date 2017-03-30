$(document).ready(function(){
	$('.parallax').parallax();
	$('.modal').modal();
	$('select').material_select();
	console.log("did materialize stuff");

	var stats_options = [
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
	Materialize.scrollFire(stats_options);
});


