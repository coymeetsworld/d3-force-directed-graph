$(document).ready(function() {
  
  var width=1000;
  var height=800;
  var radius=2;

  var svg = d3.select("body").append("svg")
    .attr("id", "chartContainer")
    .attr("width", width)
    .attr("height", height);

  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d, i) { return i; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));


  d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', function(error, graph) {
    if (error) throw error;
  
    simulation.nodes(graph.nodes)
              .on("tick", ticked);
    simulation.force("link")
              .links(graph.links);

    var link = svg.selectAll("line")
                  .data(graph.links)
                  .enter().append("line")
                  .attr("class", "link");
      
    var nodes = svg.selectAll("g.node")
                   .data(graph.nodes).enter()
                   .append("g")
                   .attr("class", "node");
  
    nodes.data(graph.nodes).append("svg:image")
         .attr("xlink:href",  function(d) { return "images/flags/" + d.country + ".png"; })
         .attr("x", -10)
         .attr("y", -10)
         .attr("height", 32)
         .attr("width", 32)
         .call(d3.drag()
                 .on("start", dragstarted)
                 .on("drag", dragged)
                 .on("end", dragended))
                 .on("mouseover", function() {

                    var countryObj = d3.select(this).datum();
                    var country = countryObj.country;
         	          var xPos = countryObj.x;
					          var yPos = countryObj.y;
          
                    svg.append('rect')
						           .attr('class', 'tip-box')
						           .attr('x', xPos - 30)
						           .attr('y', yPos - 30)
						           .attr('rx', 3)
						           .attr('ry', 3)
						           .attr('width', (country.length*10)+15)
						           .attr('height', 25);

					          svg.append('text')
						           .attr('class','tip-text')
						           .html(country)
						           .attr('x', xPos - 25)
						           .attr('y', yPos - 11);
                  }) 
      	          .on('mouseout', function(d) {
					          svg.selectAll('.tip-box').remove();
					          svg.selectAll('.tip-text').remove();
			            });

    function ticked() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
    
      nodes.attr("transform", function(d) { 
        var x = Math.max(radius, Math.min(width - radius, d.x));
        var y = Math.max(radius, Math.min(height - radius, d.y));
        return "translate(" + x + "," + y + ")";
        
      });
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
