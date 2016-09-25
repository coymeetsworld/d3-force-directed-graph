$(document).ready(function() {

	var margin = {top: 20, right: 30, bottom: 30, left: 40}
	var graphWidth = 1270 - margin.left - margin.right;
	var graphHeight = 650 - margin.top - margin.bottom;

	var graph = d3.select('#graph')
								.attr("width", graphWidth+margin.left+margin.right)
								.attr("height", graphHeight+margin.top+margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, countryData) {

		if (error) throw error;
		
		console.log(countryData.nodes);
		//nodes[x].country = "East Timor"	
		//nodes[x].code = "tl"
		console.log(countryData.links);
		//edges
		//links[y].target = 66 = countryData.nodes[66];
		//links[y].source = 0 = countryData.nodes[0];

		var nodes = countryData.nodes;
		var edges = countryData.links;

		/*var force = d3.forceSimulation()
									.size([graphWidth, graphHeight])
									.nodes(nodes)
									.links(edges);*/


	});
});
