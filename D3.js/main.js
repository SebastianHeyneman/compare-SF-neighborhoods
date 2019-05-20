var w = 1000;
var h = 620;

function cmykToRgb(c, m, y, k) {
  var r, g, b;
  r = Math.round(255 - ((Math.min(1, c * (1 - k) + k)) * 255));
  g = Math.round(255 - ((Math.min(1, m * (1 - k) + k)) * 255));
  b = Math.round(255 - ((Math.min(1, y * (1 - k) + k)) * 255));
  return "rgb("+r+","+g+","+b+")";
}

//Create variable for updating dataset
var newData;

var svg = d3.select("body .viz-row")
            .append("svg")
              .attr("width", w)
              .attr("height", h);

//Define path generator
var path = d3.geoPath()

var color = d3.scaleLinear()
.range([0,255])

var colorcmyk = d3.scaleLinear()
.range([0,1])

var tooltip = d3.select("body .viz-row").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

//Display data function

// load the dataset specified in the dropdown
function displayData(dataset) {
	console.log("displayData executed on " + dataset);

	// load the csv file with all the data
	d3.csv("TheSFData.csv", function(data) {
		//Set domain for color scale

		// solves a problem caused by the extroardinary ratio of crimes to people in golden gate park
		if (dataset === "percapitacriminalarrests") {
			colorcmyk.domain([
				d3.min(data, function(d) { return parseFloat(d[dataset]); }),
				d3.max(data, function(d) { return parseFloat(200); })
			]);

			color.domain([
				d3.min(data, function(d) { return parseFloat(d[dataset]); }),
				d3.max(data, function(d) { return parseFloat(200); })
			]);

		}
		else if (dataset === "percapitaencampments") {
			colorcmyk.domain([
				d3.min(data, function(d) { return parseFloat(d[dataset]); }),
				d3.max(data, function(d) { return parseFloat(600); })
			]);

			color.domain([
				d3.min(data, function(d) { return parseFloat(d[dataset]); }),
				d3.max(data, function(d) { return parseFloat(600); })
			]);

		}
		else {
		colorcmyk.domain([
			d3.min(data, function(d) { return parseFloat(d[dataset]); }),
			d3.max(data, function(d) { return parseFloat(d[dataset]); })
		]);

		color.domain([
			d3.min(data, function(d) { return parseFloat(d[dataset]); }),
			d3.max(data, function(d) { return parseFloat(d[dataset]); })
		]);

	}

		//Load in GeoJSON data with all the json
		d3.json("bs.json", function(json) {
			// json.transform.translate = [100,0]
			var jsonClone = JSON.parse(JSON.stringify(json));
			json = topojson.feature(json, json.objects.SFgeojson).features
			jsonClone = topojson.feature(jsonClone, jsonClone.objects.SFgeojson)

			for (var i = 0; i < data.length; i++) {
				var dataState = data[i].nhood;
				var dataValue = parseFloat(data[i][dataset]);

				for (var j = 0; j < json.length; j++) {
					var jsonState = json[j].properties.nhood;

					if (dataState == jsonState) {
						json[j].properties.value = dataValue;
						// console.log(json[j].properties.value)
						break;
					}
				}

			}

			//Bind data and create one path per GeoJSON feature
			var projection = d3.geoIdentity()
					.reflectY(true)
					.fitSize([w,h],jsonClone)

			var pathFlipped = d3.geoPath()
			.projection(projection);

			const mapSelection = svg.selectAll("path")
				.data(json)

				mapSelection
					.enter()
					.append("path")
					.attr("d", pathFlipped)
					.style("fill","#f1ebd4")
					.style("stroke","#aaaaaa")
					.style("stroke-width", "1")

					if (dataset == "default") {

						for (j in json) {

							if ("Financial District/South Beach".includes(json[j].properties.nhood)) {
									svg.append("text")
									.text("Financial District/")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'})
									.append("tspan")
									.text("South Beach")
							}

							else if ("Castro/Upper Market".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Castro/")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] - 5) + ')'})
									.append("tspan")
									.text("Upper Market")
							}

							else if ("Treasure Island".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Treasure")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] - 30) + ')'})
									.append("tspan")
									.text("Island")
							}

							else if ("Lone Mountain/USF".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Lone Mountain")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] + 9) + ')'})
							}

							else if ("Oceanview/Merced/Ingleside".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Oceanview/")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 35) + ',' + (pathFlipped.centroid(json[j])[1] - 5) + ')'})
									.append("tspan")
									.text("Merced/")
									.append("tspan")
									.text("Ingleside")
									.attr("id","nested-text")
							}

							else if (json[j].properties.nhood === "Presidio Heights") {
									svg.append("text")
									.text("Presidio")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 25) + ',' + (pathFlipped.centroid(json[j])[1] ) + ')'})
									.append("tspan")
									.text("Heights")
							}

							else if ("Pacific Heights".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Pacific")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] -5) + ')'})
									.append("tspan")
									.text("Heights")
							}

							else if ("Russian Hill".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Russian")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 12) + ',' + (pathFlipped.centroid(json[j])[1] -5) + ')'})
									.append("tspan")
									.text("Hill")
							}

							else if ("Sunset/Parkside".includes(json[j].properties.nhood)){
									svg.append("text")
									.text("Sunset/")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 50) + ',' + (pathFlipped.centroid(json[j])[1] - 50 ) + ')'})
									.append("tspan")
									.text("Parkside")
							}

							else if (json[j].properties.nhood === "Inner Richmond"){
									svg.append("text")
									.text("Inner")
									.attr('transform', function(d) {
											return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 25) + ',' + (pathFlipped.centroid(json[j])[1] -5 ) + ')'})
									.append("tspan")
									.text("Richmond")
							}

							else {
									svg.append("text")
									.text(json[j].properties.nhood)
									.attr('transform', function(d) {
											if (["Outer Richmond"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 50) + ',' + (pathFlipped.centroid(json[j])[1] + 10) + ')'}
											else if (["Golden Gate Park"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 60) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Sunset/Parkside"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 53) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Bayview Hunters Point"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 50) + ',' + (pathFlipped.centroid(json[j])[1] + 20) + ')'}
											else if (["Visitacion Valley"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 40) + ',' + (pathFlipped.centroid(json[j])[1] + 14) + ')'}
											else if (["Excelsior"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 45) + ',' + (pathFlipped.centroid(json[j])[1] + 40) + ')'}
											else if (["Bernal Heights"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] - 15) + ')'}
											else if (["West of Twin Peaks"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 50) + ',' + (pathFlipped.centroid(json[j])[1] + 20) + ')'}
											else if (["Portola"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] + 10) + ')'}
											else if (["Potrero Hill"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 35) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Mission Bay"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 43) + ',' + (pathFlipped.centroid(json[j])[1] + 20) + ')'}
											else if (["Inner Sunset"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 40) + ',' + (pathFlipped.centroid(json[j])[1] - 5) + ')'}
											else if (["Lincoln Park"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Seacliff"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] ) + ')'}
											else if (["Glen Park"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Haight Ashbury"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 25) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Noe Valley"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 35) + ',' + (pathFlipped.centroid(json[j])[1] + 10) + ')'}
											else if (["McLaren Park"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Twin Peaks"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] - 3) + ')'}
											else if (["Treasure Island"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1] - 30) + ')'}
											else if (["Outer Mission"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0])) + ',' + (pathFlipped.centroid(json[j])[1] - 20) + ')'}
											else if (["Mission"].includes(json[j].properties.nhood)) {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] - 10) + ')'}
											else if (["Chinatown"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 15) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["North Beach"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1]) + ')'}
													else if (["Tenderloin"].includes(json[j].properties.nhood)) {
															return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1]) + ')'}											// else if (["Pacific Heights"].includes(json[j].properties.nhood)) {
											// 		return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 40) + ',' + (pathFlipped.centroid(json[j])[1] - 5) + ')'}
											// else if (["Russian Hill"].includes(json[j].properties.nhood)) {
											// 		return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 15) + ',' + (pathFlipped.centroid(json[j])[1] + 5) + ')'}
											else if (["Nob Hill"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 25) + ',' + (pathFlipped.centroid(json[j])[1] + 15) + ')'}
											else if (["Marina"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 30) + ',' + (pathFlipped.centroid(json[j])[1]) + ')'}
											// else if (["Presidio Heights"].includes(json[j].properties.nhood)) {
											// 		return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 25) + ',' + (pathFlipped.centroid(json[j])[1] - 7) + ')'}
											else if (["Japantown"].includes(json[j].properties.nhood)) {
													return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 20) + ',' + (pathFlipped.centroid(json[j])[1] + 3) + ')'}
											else {
												return 'translate(' + (parseFloat(pathFlipped.centroid(json[j])[0]) - 35) + ',' + (pathFlipped.centroid(json[j])[1] + 10) + ')'
											}
										})
									}
								}
								var addLineBreak = svg.selectAll("tspan")
								.attr('x', '0')
								.attr('y', '20')

								var addLineBreakSpecial = svg.selectAll("#nested-text")
								.attr('x', '0')
								.attr('y', '40')

								var mapLabel = svg.selectAll("text")
								.attr('font-size','10	pt')
								.attr('fill','#787773')
								.attr('text-shadow','#000 0px 0px 0.5px')
								.attr('id','mapLabel')
						}

						// add pause
						// if its quick, try the random color scheme from bl.ocks
						// re-arrange the name when it's in its final place
						else {
								//Remove old text
								d3.selectAll("#mapLabel")
								.remove()
							}

			mapSelection.transition()
			.duration(900)
			.style("fill", function(d) {
				//Get data value
				var value = d.properties.value;

				if (value || value == "0") {
					// console.log("1")
					// console.log(colorCheck(value/max))
					// console.log(value/max)
					// // return colorCheck(value/max);
					// console.log(value)
					// console.log(colorcmyk(value))
					return "rgb(" + color(value) + ",0,0)";
					// return cmykToRgb(colorcmyk(value), .5);
					// return cmykToRgb(colorcmyk(value), .02, .12, .05);
					// return cmykToRgb(.98,0,.15,colorcmyk(value));
				} else {
					//If default dataset
					if (dataset == "default") {
						// console.log("2")
						return "#f1ebd4";
					//If any other dataset
					} else {
											// console.log("3")
						// return "#f1ebd4";
						return "#000";
					}
				}
			});

			mapSelection.on("mouseover", function(d) {

				//Inject data value into paragraph

				//Remove old text
				d3.select(".blurb-row .dropdown #value-label")
				.remove()

				//Display new text
				var paragraph = d3.select(".blurb-row .dropdown")
				.append("p")
				.text(function() {
					var value = d.properties.value;
					if (value || value == "0") {
							//Based on the dataset, we'll return different tooltips (formatting in terms of percentages, etc.)
							if (["percapitaincome", "medianhomevalue"].includes(dataset)) {
								return (d.properties.nhood + ": $" + d.properties.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
							} else if (["percentnonwhite", "percentinpoverty", "unemploymentrate",
								"percentinliquefaction"].includes(dataset)){
								return (d.properties.nhood + ": " + d.properties.value + "%");
							}	else if (["medianhoursofsummerfog"].includes(dataset)){
									return (d.properties.nhood + ": " + d.properties.value + " hours");
						  }	else if (["popdensityperacre", "population"].includes(dataset)){
									return (d.properties.nhood + ": " + d.properties.value + "K");
						  }	else if (["percapitacriminalarrests", "percapitaencampments"].includes(dataset)){
									return (d.properties.nhood + ": " + d.properties.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
						  }	if (dataset=="default"){
								return (d.properties.nhood);
							} else {
								return (d.properties.nhood + ": " + d.properties.value);
							}
						}
					else {
						return "-"
						}
					})
				.attr("id", "value-label")
				.classed("supreme", true)
				.style("font-size", "1em")
				.style("display", "inline")
				.style("margin-left", "30px");

				//Highlight current state
				d3.select(this)
				.transition()
				.duration(300)
				.style("opacity", .6);

			})
			.on("mouseout", function(d) {

				//Remove old text
				d3.select(".dropdown #value-label")
				.remove()

				//Return state to original opacity
				d3.select(this)
				.transition()
				.duration(350)
				.style("opacity", 1);

			});

		});

	});

};

//Display text function
function displayInformation(dataset) {

	//Load in dataset:description json file
	d3.json("descriptions.json", function(json) {

		var description = json[dataset];

		//Remove old text
		d3.select("#dataset-description")
		.remove()

		//Display new text
		var paragraph = d3.select("body .blurb-row")
		.append("p")
		.html(description)
		.attr("id", "dataset-description")
		.style("font-size", "1em")
		.style("font-family", "Georgia, sans-serif")
		.style("font-style", "italic");

	});

}

//Load initial data and description
displayData("default");
displayInformation("default");

// handle on click event
d3.select('#opts')
  .on('change', function() {
    newData = d3.select(this).property('value');
    displayInformation(newData);
    displayData(newData);
});
