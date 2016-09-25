$(document).ready(function() {

	var margin = {top: 20, right: 30, bottom: 30, left: 40}
	var chartWidth = 1270 - margin.left - margin.right;
	var chartHeight = 650 - margin.top - margin.bottom;

	var chart = d3.select('#chart')
								.attr("width", chartWidth+margin.left+margin.right)
								.attr("height", chartHeight+margin.top+margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, countryData) {

		if (error) throw error;
		
		console.log(countryData.nodes);
		//nodes[x].country = "East Timor"	
		//nodes[x].code = "tl"
		console.log(countryData.links);
		//links[y].target = 66 = countryData.nodes[66];
		//links[y].source = 0 = countryData.nodes[0];

	});
});
