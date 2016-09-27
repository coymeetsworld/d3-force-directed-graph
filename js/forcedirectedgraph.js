$(document).ready(function() {

	var graphWidth = 800;
	var graphHeight = 800;
	var radius = 2;

	var graph = d3.select('#graph')
								.attr("width", graphWidth)
								.attr("height", graphHeight)
								.append("g");

	var simulation = d3.forceSimulation()
											.force("link", d3.forceLink().distance(15))
											.force("charge", d3.forceManyBody())
											.force("center", d3.forceCenter(graphWidth/2, graphHeight/2));

	d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, countryData) {

		if (error) throw error;
		
		var link = graph.append("g")
										.attr("class", "links")
										.selectAll("line")
										.data(countryData.links)
										.enter().append("line")
										.attr("stroke-width", 2);

		var node = graph.append("g")
										.attr("class", "nodes")
										.selectAll("circle")
										.data(countryData.nodes)
										.enter().append("circle")
										.attr("r", 5)
										.attr("fill", function(d) { return 'red'; })
										.call(d3.drag()
														.on("start", dragstarted)
														.on("drag", dragged)
														.on("end", dragended));

		/* On hover shows the country name. */
		node.append("title")
				.text(function(d) { return d.country; });

		simulation.nodes(countryData.nodes).on("tick", ticked);
		simulation.force("link").links(countryData.links);

		var nodes = countryData.nodes;
		var edges = countryData.links;

		function ticked() {
			link.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });

			/* keeps nodes bound within the box. */
			node.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(graphWidth - radius, d.x)); })
					.attr("cy", function(d) { return d.y = Math.max(radius, Math.min(graphHeight - radius, d.y)); });
		}

	});

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragged(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}


});
