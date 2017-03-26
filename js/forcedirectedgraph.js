  
const WIDTH = 1000;
const HEIGHT = 800;
const RADIUS = 2;

let svg = d3.select("body")
            .append("svg")
            .attr("id", "chart-container")
            .attr("width", WIDTH)
            .attr("height", HEIGHT);

let simulation = d3.forceSimulation()
                   .force("link", d3.forceLink().id((d, i) => i).strength(() => 0.2))
                   .force("charge", d3.forceManyBody().strength(() => -15).theta(() => 0.2))
                   .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2));


d3.json('https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json', (error, graph) => {

  const ticked = () => {
    link.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    nodes.attr("transform", (d) => {
      const X = Math.max(RADIUS, Math.min(WIDTH - RADIUS, d.x));
      const Y = Math.max(RADIUS, Math.min(HEIGHT - RADIUS, d.y));
      return `translate(${X},${Y})`;
    });
  }

  if (error) throw error;

  simulation.nodes(graph.nodes)
            .on("tick", ticked);
  simulation.force("link")
            .links(graph.links);

  let link = svg.selectAll("line")
                .data(graph.links)
                .enter().append("line")
                .attr("class", "link");

  let nodes = svg.selectAll("g.node")
                 .data(graph.nodes).enter()
                 .append("g")
                 .attr("class", "node");

  nodes.data(graph.nodes)
       .append("svg:image")
       .attr("xlink:href", d => { return "images/flags/" + d.country + ".png"; })
       .attr("x", -10)
       .attr("y", -10)
       .attr("height", 32)
       .attr("width", 32)
       .call(d3.drag()
               .on("start", dragstarted)
               .on("drag", dragged)
               .on("end", dragended))
               .on("mouseover", function(){
                  const COUNTRY_OBJ = d3.select(this).datum();
                  const COUNTRY = COUNTRY_OBJ.country;
                  const X_POS = COUNTRY_OBJ.x;
                  const Y_POS = COUNTRY_OBJ.y;

                  svg.append('rect')
                     .attr('class', 'tip-box')
                     .attr('x', X_POS - 30)
                     .attr('y', Y_POS - 30)
                     .attr('rx', 3)
                     .attr('ry', 3)
                     .attr('width', (COUNTRY.length*10)+15)
                     .attr('height', 25);

                  svg.append('text')
                     .attr('class','tip-text')
                     .html(COUNTRY)
                     .attr('x', X_POS - 25)
                     .attr('y', Y_POS - 11);
                }) 
                .on('mouseout', (d) => {
                  svg.selectAll('.tip-box').remove();
                  svg.selectAll('.tip-text').remove();
                });

});

const dragstarted = (d) => {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  simulation.fix(d);
}

const dragged = (d) => {
  simulation.fix(d, d3.event.x, d3.event.y);
}

const dragended = (d) => {
  if (!d3.event.active) simulation.alphaTarget(0);
  simulation.unfix(d);
}

