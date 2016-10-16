$(document).ready(function() {
  
  var width=1000;
  var height=800;
  var radius=2;

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d, i) { return i; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, graph) {
  if (error) throw error;
  
  
  console.log(graph);

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes)
    .enter().append("circle")
      .attr("r", 5)
      .attr("class", "node")
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.country; });

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);
  simulation.force("link")
      .links(graph.links);
      

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
       .attr("cx", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
			  .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
  }
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

	
});
