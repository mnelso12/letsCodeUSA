google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	var cs_starting = 61321;
	var college_starting = 50556;
	var high_school_starting = 0;
	var cs_lifetime = 1670000;
	var college_lifetime = 1190000;
	var high_school_lifetime = 580000;

	var cs_style="stroke-color: #00796b; stroke-opacity: 1.0; stroke-width: 8; fill-color: #4db6ac; fill-opacity: 1.0";
	var college_style="stroke-color: #871B47; stroke-opacity: 1.0; stroke-width: 8; fill-color: #BC5679; fill-opacity: 1.0";
	var high_school_style ="stroke-color: #3f51b5; stroke-opacity: 1.0; stroke-width: 8; fill-color: #7986cb; fill-opacity: 1.0";

	var cs_lifetime_tooltip = "<div style='padding: 5px;'><p>Average Lifetime Earnings</p><p class='indigo-text'>Computer Science Graduate</p><b>$" + cs_lifetime + "</b></div>";


	var data = google.visualization.arrayToDataTable([
		['', 'Average Starting Salary', { role: 'style' }, { role: 'annotation' }],
		['CS Graduate', 61321, cs_style, '$61.3K'],
		['College Graduate', 50556, college_style, '$50.6K'],
		['High School Graduate', 0, high_school_style, '$0.0K']
	]);

	var lifetime_data = google.visualization.arrayToDataTable([
//		['', 'Average Lifetime Earnings', { role: 'style' }, { role: 'annotation' }, {'type': 'string', 'role': 'tooltip', 'p': {'html': true}}],
		['', 'Average Lifetime Earnings', { role: 'style' }, { role: 'annotation' }],
		//['CS Graduate', cs_lifetime, cs_style, '$1.67M', cs_lifetime_tooltip],
		//['College Graduate', college_lifetime, college_style, '$1.19M', '<h1>grrr</h1>'], 
		//['High School Graduate', high_school_lifetime, high_school_style, '$.58M', 'meh']
		['CS Graduate', cs_lifetime, cs_style, '$1.67M'],
		['College Graduate', college_lifetime, college_style, '$1.19M'], 
		['High School Graduate', high_school_lifetime, high_school_style, '$.58M']
	]);

	var background_color = '#c5cae9';

	var options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: background_color,
		legend: {position: 'none'},
		hAxis: {format: 'currency'},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var lifetime_options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: background_color,
		legend: {position: 'none'},
		hAxis: {format: 'currency'},
		tooltip: {isHtml: true},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var chart = new google.visualization.BarChart(document.getElementById('barchart_material'));
	var lifetime_chart = new google.visualization.BarChart(document.getElementById('lifetime_chart'));

	chart.draw(data, options);
	lifetime_chart.draw(lifetime_data, lifetime_options);
}
