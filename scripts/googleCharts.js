google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var factor = 1000000;

	var cs_style="stroke-color: #00796b; stroke-opacity: 1.0; stroke-width: 8; fill-color: #4db6ac; fill-opacity: 1.0"
	var college_style="stroke-color: #871B47; stroke-opacity: 1.0; stroke-width: 8; fill-color: #BC5679; fill-opacity: 1.0"
	var high_school_style ="stroke-color: #3f51b5; stroke-opacity: 1.0; stroke-width: 8; fill-color: #7986cb; fill-opacity: 1.0"

	var data = google.visualization.arrayToDataTable([
		['', 'Average Starting Salaries', { role: 'style' }],
		['CS Graduate', 61321, cs_style],
		['College Graduate', 50556, college_style],
		['High School Graduate', 0, high_school_style]
	]);

	var lifetime_data = google.visualization.arrayToDataTable([
		['', '', { role: 'style' }],
		['CS Graduate', 1.67*factor, cs_style],
		['College Graduate', 1.19*factor, college_style], 
		['High School Graduate', .58*factor, high_school_style]
	]);

	var background_color = '#c5cae9';

	var options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: background_color,
		legend: {position: 'none'},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var lifetime_options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: background_color,
		legend: {position: 'none'},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var chart = new google.visualization.BarChart(document.getElementById('barchart_material'));
	var lifetime_chart = new google.visualization.BarChart(document.getElementById('lifetime_chart'));

	chart.draw(data, options);
	lifetime_chart.draw(lifetime_data, lifetime_options);
}
