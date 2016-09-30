$(document).ready(function() {


	var graphWidth = 1000;
	var graphHeight = 800;
	var radius = 2;
	var graphEdges, graphNodes;

	var graph = d3.select('#graph')
								.attr("width", graphWidth)
								.attr("height", graphHeight);

											
	d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, countryData) {

		if (error) throw error;


		
		var nodes = countryData.nodes;
		var edges = countryData.links;

		graphEdges = graph.selectAll(".link")
													.data(edges, function(d) { return d.target.id; });

	  graphEdges.exit().remove();

		var edgeEnter = graphEdges.enter().append("line").attr("class", "link");


		graphNodes = graph.selectAll(".node")
													.data(nodes, function(d) { return d.id; });

	  graphNodes.exit().remove();

															//.on("click", click)
		var nodeEnter = graphNodes.enter()
															.append("g")
															.attr("class", "node")
															.call(d3.drag()
																			.on("start", dragstarted)
																			.on("drag", dragged)
																			.on("end", dragended));

		nodeEnter.append("circle").attr("r", 5).append("title").text(function(d) { return d.country; });

		graphNodes = nodeEnter.merge(graphNodes);
		
	var simulation = d3.forceSimulation()
										.force("link", d3.forceLink().id(function(d) { return d.id; }))
										.force("charge", d3.forceManyBody().strength([-15]).distanceMax([250]).theta([0.2]))
										.force("center", d3.forceCenter(graphWidth/2, graphHeight/2))
										.on("tick", ticked);
	function ticked() {
			graphEdges.attr("x1", function(d) { return d.source.x; })
					.attr("y1", function(d) { return d.source.y; })
					.attr("x2", function(d) { return d.target.x; })
					.attr("y2", function(d) { return d.target.y; });

			/* keeps nodes bound within the box. */
			graphNodes.attr("cx", function(d) { return d.x = Math.max(radius, Math.min(graphWidth - radius, d.x)); })
					.attr("cy", function(d) { return d.y = Math.max(radius, Math.min(graphHeight - radius, d.y)); });
	}

		simulation.nodes(nodes);
		simulation.force("link").links(edges);

										/*nodeEnter.append("svg:image")
										.attr("xlink:href", "images/spidey.png")
										.attr("height", 50)
										.attr("width", 50);*/


		/*var node = graph.append("g")
										.attr("class", "nodes")
										.selectAll("circle")
										.data(countryData.nodes)
										.enter().append("circle")
										.attr("r", 5)
										.attr("fill", function(d) { return 'red'; })
										.call(d3.drag()
														.on("start", dragstarted)
														.on("drag", dragged)
														.on("end", dragended));*/

/*<img src="blank.gif" class="flag flag-cz" alt="Czech Republic" />
/*      .attr("width", 150)
      .attr("height", 200);*/



		/* On hover shows the country name. */
		/*node.append("title")
				.text(function(d) { return d.country; });*/




	});

	function dragstarted(d) {
		if (!d3.event.active) simulation.alphaTarget(0.3).restart();
		simulation.fix(d);
	}

	function dragged(d) {
		simulation.fix(d, d3.event.x, d3.event.y);
	}

	function dragended(d) {
		if (!d3.event.active) simulation.alphaTarget(0);
		simulation.unfix(d);
	}

	/*function click(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
			update();

		}
	}*/

});
