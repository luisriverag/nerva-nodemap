// NERVA nodemap by syzygy

let _isFirstLoad = true, _isDarkMode = false,
	_nodecount = 0, _nodecloud = 0, _nodecountry = [], _nodecontinent = [], _nodeversion = [],
	countries_chart = null, continents_chart = null, origin_chart = null, versions_chart = null,
	cur_dataset = "data/connections_30d.txt",
	continents = { 'AF' : 'Africa','NA' : 'North America','SA' : 'South America','EU' : 'Europe','OC' : 'Oceania','AS' : 'Asia' },
	countries = { 'AF' : 'Afghanistan','AX' : 'Aland Islands','AL' : 'Albania','DZ' : 'Algeria','AS' : 'American Samoa','AD' : 'Andorra','AO' : 'Angola','AI' : 'Anguilla','AQ' : 'Antarctica','AG' : 'Antigua And Barbuda','AR' : 'Argentina','AM' : 'Armenia','AW' : 'Aruba','AU' : 'Australia','AT' : 'Austria','AZ' : 'Azerbaijan','BS' : 'Bahamas','BH' : 'Bahrain','BD' : 'Bangladesh','BB' : 'Barbados','BY' : 'Belarus','BE' : 'Belgium','BZ' : 'Belize','BJ' : 'Benin','BM' : 'Bermuda','BT' : 'Bhutan','BO' : 'Bolivia','BA' : 'Bosnia And Herzegovina','BW' : 'Botswana','BV' : 'Bouvet Island','BR' : 'Brazil','IO' : 'British Indian Ocean Territory','BN' : 'Brunei Darussalam','BG' : 'Bulgaria','BF' : 'Burkina Faso','BI' : 'Burundi','KH' : 'Cambodia','CM' : 'Cameroon','CA' : 'Canada','CV' : 'Cape Verde','KY' : 'Cayman Islands','CF' : 'Central African Republic','TD' : 'Chad','CL' : 'Chile','CN' : 'China','CX' : 'Christmas Island','CC' : 'Cocos (Keeling) Islands','CO' : 'Colombia','KM' : 'Comoros','CG' : 'Congo','CD' : 'Congo, Democratic Republic','CK' : 'Cook Islands','CR' : 'Costa Rica','CI' : 'Cote D\'Ivoire','HR' : 'Croatia','CU' : 'Cuba','CY' : 'Cyprus','CZ' : 'Czech Republic','DK' : 'Denmark','DJ' : 'Djibouti','DM' : 'Dominica','DO' : 'Dominican Republic','EC' : 'Ecuador','EG' : 'Egypt','SV' : 'El Salvador','GQ' : 'Equatorial Guinea','ER' : 'Eritrea','EE' : 'Estonia','ET' : 'Ethiopia','FK' : 'Falkland Islands (Malvinas)','FO' : 'Faroe Islands','FJ' : 'Fiji','FI' : 'Finland','FR' : 'France','GF' : 'French Guiana','PF' : 'French Polynesia','TF' : 'French Southern Territories','GA' : 'Gabon','GM' : 'Gambia','GE' : 'Georgia','DE' : 'Germany','GH' : 'Ghana','GI' : 'Gibraltar','GR' : 'Greece','GL' : 'Greenland','GD' : 'Grenada','GP' : 'Guadeloupe','GU' : 'Guam','GT' : 'Guatemala','GG' : 'Guernsey','GN' : 'Guinea','GW' : 'Guinea-Bissau','GY' : 'Guyana','HT' : 'Haiti','HM' : 'Heard Island & Mcdonald Islands','VA' : 'Holy See (Vatican City State)','HN' : 'Honduras','HK' : 'Hong Kong','HU' : 'Hungary','IS' : 'Iceland','IN' : 'India','ID' : 'Indonesia','IR' : 'Iran, Islamic Republic Of','IQ' : 'Iraq','IE' : 'Ireland','IM' : 'Isle Of Man','IL' : 'Israel','IT' : 'Italy','JM' : 'Jamaica','JP' : 'Japan','JE' : 'Jersey','JO' : 'Jordan','KZ' : 'Kazakhstan','KE' : 'Kenya','KI' : 'Kiribati','KR' : 'Korea','KW' : 'Kuwait','KG' : 'Kyrgyzstan','LA' : 'Lao People\'s Democratic Republic','LV' : 'Latvia','LB' : 'Lebanon','LS' : 'Lesotho','LR' : 'Liberia','LY' : 'Libyan Arab Jamahiriya','LI' : 'Liechtenstein','LT' : 'Lithuania','LU' : 'Luxembourg','MO' : 'Macao','MK' : 'Macedonia','MG' : 'Madagascar','MW' : 'Malawi','MY' : 'Malaysia','MV' : 'Maldives','ML' : 'Mali','MT' : 'Malta','MH' : 'Marshall Islands','MQ' : 'Martinique','MR' : 'Mauritania','MU' : 'Mauritius','YT' : 'Mayotte','MX' : 'Mexico','FM' : 'Micronesia, Federated States Of','MD' : 'Moldova','MC' : 'Monaco','MN' : 'Mongolia','ME' : 'Montenegro','MS' : 'Montserrat','MA' : 'Morocco','MZ' : 'Mozambique','MM' : 'Myanmar','NA' : 'Namibia','NR' : 'Nauru','NP' : 'Nepal','NL' : 'Netherlands','AN' : 'Netherlands Antilles','NC' : 'New Caledonia','NZ' : 'New Zealand','NI' : 'Nicaragua','NE' : 'Niger','NG' : 'Nigeria','NU' : 'Niue','NF' : 'Norfolk Island','MP' : 'Northern Mariana Islands','NO' : 'Norway','OM' : 'Oman','PK' : 'Pakistan','PW' : 'Palau','PS' : 'Palestinian Territory, Occupied','PA' : 'Panama','PG' : 'Papua New Guinea','PY' : 'Paraguay','PE' : 'Peru','PH' : 'Philippines','PN' : 'Pitcairn','PL' : 'Poland','PT' : 'Portugal','PR' : 'Puerto Rico','QA' : 'Qatar','RE' : 'Reunion','RO' : 'Romania','RU' : 'Russian Federation','RW' : 'Rwanda','BL' : 'Saint Barthelemy','SH' : 'Saint Helena','KN' : 'Saint Kitts And Nevis','LC' : 'Saint Lucia','MF' : 'Saint Martin','PM' : 'Saint Pierre And Miquelon','VC' : 'Saint Vincent And Grenadines','WS' : 'Samoa','SM' : 'San Marino','ST' : 'Sao Tome And Principe','SA' : 'Saudi Arabia','SN' : 'Senegal','RS' : 'Serbia','SC' : 'Seychelles','SL' : 'Sierra Leone','SG' : 'Singapore','SK' : 'Slovakia','SI' : 'Slovenia','SB' : 'Solomon Islands','SO' : 'Somalia','ZA' : 'South Africa','GS' : 'South Georgia And Sandwich Isl.','ES' : 'Spain','LK' : 'Sri Lanka','SD' : 'Sudan','SR' : 'Suriname','SJ' : 'Svalbard And Jan Mayen','SZ' : 'Swaziland','SE' : 'Sweden','CH' : 'Switzerland','SY' : 'Syrian Arab Republic','TW' : 'Taiwan','TJ' : 'Tajikistan','TZ' : 'Tanzania','TH' : 'Thailand','TL' : 'Timor-Leste','TG' : 'Togo','TK' : 'Tokelau','TO' : 'Tonga','TT' : 'Trinidad And Tobago','TN' : 'Tunisia','TR' : 'Turkey','TM' : 'Turkmenistan','TC' : 'Turks And Caicos Islands','TV' : 'Tuvalu','UG' : 'Uganda','UA' : 'Ukraine','AE' : 'United Arab Emirates','GB' : 'United Kingdom','US' : 'United States','UM' : 'United States Outlying Islands','UY' : 'Uruguay','UZ' : 'Uzbekistan','VU' : 'Vanuatu','VE' : 'Venezuela','VN' : 'Viet Nam','VG' : 'Virgin Islands, British','VI' : 'Virgin Islands, U.S.','WF' : 'Wallis And Futuna','EH' : 'Western Sahara','YE' : 'Yemen','ZM' : 'Zambia','ZW' : 'Zimbabwe' };
	cloudcoords = {
		'38.6582,-77.2497' : 'Washington 1',
		'39.0438,-77.4874' : 'Washington 2',
		'40.7357,-74.1724' : 'New York 1',
		'40.8054,-74.0241' : 'New York 2',
		'37.751,-97.822' : 'US central',
		'37.3598,-121.981' : 'California 1',
		'37.4056,-122.0775' : 'California 2',
		'47.6107,-122.575' : 'Seattle',
		'50.1109,8.68213' : 'Frankfurt',
		'52.3563,4.95714' : 'Amsterdam',
		'51.4742,-0.07972' : 'London',
		'6.92708,79.8612' : 'Sri Lanka',
		'32.0617,118.763' : 'China 1',
		'34.2058,117.284' : 'China 2',
		'36.1627,-86.7816' : 'Nashville'
	};
		map_markers = L.markerClusterGroup({maxClusterRadius: 20});
const	map_icon = new L.Icon({ iconUrl: 'img/marker-nerva.png', shadowUrl: 'img/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });

function onPageLoad()
{
	$.get("snapshots.php", function(data) {
		let snapshots = data.split("<br>");
		for (let i = 0; i < snapshots.length; i++)
		{
			if(snapshots[i].length) {
				let select = document.getElementById("dataset2");
				select.options[select.options.length] = new Option(snapshots[i], "data/historical/" + snapshots[i] + ".txt");
			}
		}
	});
	document.getElementById("dataset1").selectedIndex = "2";
	document.getElementById("dataset2").style.display = "none";
	init(cur_dataset);
}

function init(path)
{
	$.when(jQuery.getJSON( path, function(){}).done(function(data) {
		let nodes = data.result;
		for (let i = 0; i <= nodes.length; i++)
		{
			if (typeof nodes[i] !== 'undefined') {
				let time = deunix(nodes[i]["time"]),
					latlng = [nodes[i]["lat"], nodes[i]["long"]],
					marker = L.marker(latlng, {riseOnHover: true}, {title: i});
				if (isLatLngCloud(latlng)) { _nodecloud ++; }
				_nodecount ++;
				_nodeversion[i] = (nodes[i]["version"] == "0.0.0.0" /*Peerlist import*/ ? "0.1.6.4" : nodes[i]["version"]); 
				_nodecountry[i] = nodes[i]["cc"];
				_nodecontinent[i] = nodes[i]["cn"];

				marker.setIcon(map_icon);
				marker.bindPopup("version: <strong>" + _nodeversion[i] + "</strong><br />connected: <strong>" + time + "</strong><br />");
				map_markers.addLayer(marker);
			}
		}
	})).then(function () {
		map_render();
		stats_render();
	});
}

function map_render()
{
	let latlng = [25, 15],
		zoom = 2;
		bounds = L.latLngBounds([-90, -9000], [90, 9000]);
	if(!_isFirstLoad) {
		latlng = map.getCenter();
		zoom = map.getZoom();
		map.remove();
	}

	map = L.map('map', {'worldCopyJump': true}).setView(latlng, zoom);
	map.setMaxBounds(bounds);
	map.on('drag', function() { map.panInsideBounds(bounds, { animate: false }); });
	map_tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 10,
		id: (_isDarkMode ? 'mapbox.high-contrast' : 'mapbox.emerald'),
		accessToken: 'pk.eyJ1IjoiamFja2hhcnBlciIsImEiOiJjanM5bWdybjExbzJxNDRudGU0Z3F0M2J1In0.D5ZUzq5xeur4rvpkS3je0Q'
	}).addTo(map);
	map.addLayer(map_markers);
}

function stats_render()
{
	let countries = statify(_nodecountry),
		continents = statify(_nodecontinent),
		versions = statify(_nodeversion);
	if(!_isFirstLoad) {
		countries_chart.destroy();
		continents_chart.destroy();
		versions_chart.destroy();
		origin_chart.destroy();
	}
	else _isFirstLoad = false;
	
	document.getElementById("count_nodes").innerHTML = _nodecount;
	document.getElementById("count_countries").innerHTML = countries.length;
	
	countries_chart = new Chart(document.getElementById("countries").getContext('2d'), {
		type: 'horizontalBar',
		data: { datasets: [{}] },
		options: {
			legend: { display: false },
			scales: {
				xAxes: [{
					display: false,
					type: 'logarithmic'
				}],
				yAxes: [{
					ticks: { fontColor: _isDarkMode ? '#fff' : '#000' }
				}],
			}
		}
	});
	countries_chart.config.data.datasets[0].backgroundColor = gradify(9);
		
	continents_chart = new Chart(document.getElementById("continents").getContext('2d'), {
		type: 'bar',
		data: { datasets: [{}] },
		options: {
			legend: { display: false },
			scales: {
				xAxes: [{
					ticks: { fontColor: _isDarkMode ? '#fff' : '#000' },
				}],
				yAxes: [{
					display: false,
					type: 'logarithmic'
				}],
			}
		}
	});
	continents_chart.config.data.datasets[0].backgroundColor = gradify(5);
		
	versions_chart = new Chart(document.getElementById("version").getContext('2d'), {
		type: 'pie',
		data: { datasets: [{ borderWidth: _isDarkMode ? 0 : 1 }] },
		options: {
			legend: {
				position: 'left',
				labels: {
					fontColor: _isDarkMode ? "#fff" : "#000"
				}
			},
			tooltips: {
				callbacks: {
					label: function(tooltipItem, data) {
						let allData = data.datasets[tooltipItem.datasetIndex].data,
							tooltipLabel = data.labels[tooltipItem.index],
							tooltipData = allData[tooltipItem.index],
							total = 0;
						for (let i in allData) { total += parseFloat(allData[i]); }
						let tooltipPercentage = Math.round((tooltipData / total) * 100);
						return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
					}
				}
			}
		}
	});
	versions_chart.config.data.datasets[0].backgroundColor = gradify(versions.length);
		
	origin_chart = new Chart(document.getElementById("origin").getContext('2d'), {
		type: 'pie',
		data: {
			labels: ["Cloud Hosted", "Home Node"],
			datasets: [{
				data: [_nodecloud, _nodecount - _nodecloud],
				backgroundColor: [
					'rgba(99, 88, 145, 1)',
					'rgba(85, 168, 191, 1)'
				],
				borderWidth: _isDarkMode ? 0 : 1
			  }]
			},
			options: {
				legend: {
					display: true,
					position: 'left',
					labels: {
						fontColor: _isDarkMode ? "#fff" : "#000"
					}
				},
				tooltips: {
					callbacks: {
						label: function(tooltipItem, data) {
							let allData = data.datasets[tooltipItem.datasetIndex].data,
								tooltipLabel = data.labels[tooltipItem.index],
								tooltipData = allData[tooltipItem.index],
								total = 0;
							for (let i in allData) { total += parseFloat(allData[i]); }
							let tooltipPercentage = Math.round((tooltipData / total) * 100);
							return tooltipLabel + ': ' + tooltipData + ' (' + tooltipPercentage + '%)';
						}
					}
				}
			}
		}
	);
	
	// Import data
	
	for (let i=0; i<= 9; i++) {
		countries[i][0] = getCountryName(countries[i][0]);
		addChartData(countries_chart, countries[i][0], countries[i][1]);
	}
	for (let i=0; i<=5; i++) {
		continents[i][0] = getContinentName(continents[i][0]);
		addChartData(continents_chart, continents[i][0], continents[i][1]);
	}
	for (let i=0; i<=versions.length - 2; i++) {
		addChartData(versions_chart, versions[i][0], versions[i][1]);
	}
	countries_chart.update();
	continents_chart.update();
	versions_chart.update();
}

function addChartData(chart, label, value)
{
	chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => { dataset.data.push(value); });
    chart.update();
}

function load_data(input)
{
	let data = input.value;
	if(data == "historical") {
		document.getElementById("dataset2").style.display = "inline";
	} else { 
		document.getElementById("dataset2").style.display = "none";
		document.getElementById("dataset2").selectedIndex = "0";
		cur_dataset = data;
		re_init();
	}
}
function load_data_historical(input)
{
	let data = input.value;	
	if(data != "null") {
		cur_dataset = data;
		re_init();
	}
}

function re_init()
{
	map_markers.clearLayers();
	_nodecount = 0, _nodecloud = 0, _nodecountry = [], _nodecontinent = [], _nodeversion = [];
	init(cur_dataset);
}

function toggleDarkLight() {
	_isDarkMode ^= true;
	
	document.getElementById("body").className = (_isDarkMode ? "dark-mode" : "light-mode");
	document.getElementById("faq").className = (_isDarkMode ? "faq-darkmode" : "faq-lightmode");
	
	let navbar = document.getElementById("navbar"),
	 pages = document.getElementById("wrapper").querySelectorAll("div.page");
	if (_isDarkMode) {
		navbar.className = navbar.className.replace("navbar-lightmode", "navbar-darkmode");
		for (let i = 0; i < pages.length; i++) { pages[i].className = pages[i].className.replace("page-lightmode", "page-darkmode"); }
	} else {
		navbar.className = navbar.className.replace("navbar-darkmode", "navbar-lightmode");
		for (let i = 0; i < pages.length; i++) { pages[i].className = pages[i].className.replace("page-darkmode", "page-lightmode"); }
	}
	
	map_render();
	stats_render();
}


function deunix(time)
{ // convert unix stamp to human friendly time
	let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		date = new Date(time*1000),
		month = months[date.getMonth()],
		day = date.getDate(),
		realtime = month + " " + day;
	return realtime;
}

function statify(array)
{ // order by frequency of values in given array
	let c = {},
		s = [];
	for (let i=0; i<=array.length; i++) {
		c[array[i]] = c[array[i]] || 0;
		c[array[i]]++;
	}
	for (let key in c) {
		s.push([key, c[key]])
	}
	s.sort(function(a, b) {return b[1]-a[1];});
	return(s);
}

function gradify(stops)
{ // generate nerva gradient with x color stops
	let color1 = [85, 168, 191, 1],
		color2 = [99, 88, 145, 1],
		array = [];
	for(let i=0; i<=stops; i++) {
		let p = 1 / stops * i,
			w = p * 2 - 1,
			w1 = (w/1+1) / 2,
			w2 = 1 - w1;
		array[i] = "rgba(" + Math.round(color1[0] * w1 + color2[0] * w2) + "," + Math.round(color1[1] * w1 + color2[1] * w2) + "," + Math.round(color1[2] * w1 + color2[2] * w2) + "," + 1 + ")";
	}
	return array;
}

function isLatLngCloud (latlng) {
	return (cloudcoords.hasOwnProperty(latlng));
}
function getCountryName (cc) {
    if (countries.hasOwnProperty(cc)) {
        return countries[cc];
    } else return cc;
}
function getContinentName (cn) {
    if (continents.hasOwnProperty(cn)) {
        return continents[cn];
    } else return cn;
}
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
});