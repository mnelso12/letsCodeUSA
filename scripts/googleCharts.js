google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	// jobs ////////////////////////////////////

	var cs_starting = 61321;
	var college_starting = 50556;
	var high_school_starting = 30000; // http://work.chron.com/average-salary-college-degree-1861.html
	var cs_lifetime = 1670000;
	var college_lifetime = 1190000;
	var high_school_lifetime = 580000;

	var cs_style="stroke-color: #00796b; stroke-opacity: 1.0; stroke-width: 8; fill-color: #4db6ac; fill-opacity: 1.0";
	var college_style="stroke-color: #ad1457; stroke-opacity: 1.0; stroke-width: 8; fill-color: #f06292; fill-opacity: 1.0";
	var high_school_style ="stroke-color: #3f51b5; stroke-opacity: 1.0; stroke-width: 8; fill-color: #7986cb; fill-opacity: 1.0";

	var cs_lifetime_tooltip = "<div style='padding: 5px;'><p>Average Lifetime Earnings</p><p class='indigo-text'>Computer Science Graduate</p><b>$" + cs_lifetime + "</b></div>";


	var data = google.visualization.arrayToDataTable([
		['', 'Average Starting Salary', { role: 'style' }, { role: 'annotation' }],
		['Computer Science Graduate', cs_starting, cs_style, '$61.3K'],
		['College Graduate', college_starting, college_style, '$50.6K'],
		['High School Graduate', high_school_starting, high_school_style, '$30.0K']
	]);

	var lifetime_data = google.visualization.arrayToDataTable([
		//		['', 'Average Lifetime Earnings', { role: 'style' }, { role: 'annotation' }, {'type': 'string', 'role': 'tooltip', 'p': {'html': true}}],
		//['Computer Science Graduate', cs_lifetime, cs_style, '$1.67M', cs_lifetime_tooltip],
		//['College Graduate', college_lifetime, college_style, '$1.19M', '<h1>grrr</h1>'], 
		//['High School Graduate', high_school_lifetime, high_school_style, '$.58M', 'meh']
		['', 'Average Lifetime Earnings', { role: 'style' }, { role: 'annotation' }],
		['Computer Science Graduate', cs_lifetime, cs_style, '$1.67M'],
		['College Graduate', college_lifetime, college_style, '$1.19M'], 
		['High School Graduate', high_school_lifetime, high_school_style, '$.58M']
	]);

	var indigo_background_color = '#c5cae9';
	var pink_background_color = '#fce4ec';

	var starting_salary_options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: pink_background_color,
		fontSize: 14,
		fontName: 'Roboto',
		legend: {position: 'none'},
		hAxis: {format: 'currency'},
		chartArea: {left: 200, width: 400},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var lifetime_options = {
		chart: {
			title: '',
			subtitle: '',
		},
		backgroundColor: pink_background_color,
		fontSize: 14,
		fontName: 'Roboto',
		legend: {position: 'none'},
		hAxis: {format: 'currency'},
		chartArea: {left: 200, width: 400},
		tooltip: {isHtml: true},
		bars: 'horizontal' // Required for Material Bar Charts.
	};

	var starting_salary_chart = new google.visualization.BarChart(document.getElementById('barchart_material'));
	var lifetime_chart = new google.visualization.BarChart(document.getElementById('lifetime_chart'));

	starting_salary_chart.draw(data, starting_salary_options);
	lifetime_chart.draw(lifetime_data, lifetime_options);






	// diversity ////////////////////////////////////

	var pink_style = "stroke-color: #ad1457; stroke-width: 8; fill-color: #f06292;";
	var blue_style = "stroke-color: #3f51b5; stroke-width: 8; fill-color: #7986cb;";

	var gender_data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Men', 74],
		['Women', 26]
	]);

	var racial_data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day', {role: 'style'}],
		['Black', 8, blue_style],
		['Hispanic', 6, pink_style],
		['Other', 86, pink_style]
	]);
	
	var yellow_background_color = '#fff9c4';
	var green_background_color = '#c8e6c9';

	var gender_options = {
		fontSize: 14,
		fontName: 'Roboto',
		height: '100%',
		width: '100%',
		hAxis: {format: 'currency'},
		backgroundColor: yellow_background_color,
		legend: {position: 'none'},
		chartArea : { left: '2%', top: '2%', width: '96%', height: '96%' },
		slices: {
			0: { color: '#3f51b5' },
			1: { color: '#f06292' }
		},
		pieHole: 0.4
	};

	var racial_options = {
		fontSize: 14,
		fontName: 'Roboto',
		height: '100%',
		width: '100%',
		hAxis: {format: 'currency'},
		backgroundColor: green_background_color,
		legend: {position: 'none'},
		chartArea : { left: '2%', top: '2%', width: '96%', height: '96%', 
			backgroundColor: {
				stroke: "#ff7634",
				strokeWidth: 8
			}
		},
		slices: {
			0: { color: '#3f51b5' },
			1: { color: '#009688' },
			2: { color: '#90a4ae' }
		},
		pieHole: 0.4
	};

	var gender_chart = new google.visualization.PieChart(document.getElementById('gender_donut'));
	var racial_chart = new google.visualization.PieChart(document.getElementById('racial_donut'));
	gender_chart.draw(gender_data, gender_options);
	racial_chart.draw(racial_data, racial_options);

}
