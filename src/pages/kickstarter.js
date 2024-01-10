import { useState, useEffect } from "react";
import "../App.css";
import * as d3 from "d3";

function Kickstarter() {
  const [kickstarters, setKickstarters] = useState(null);

  useEffect(() => {
    const kickstartersURL =
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

    d3.json(kickstartersURL).then((kickstarterData) => {
      setKickstarters(kickstarterData);
    });
  }, []);

  useEffect(() => {
    if (kickstarters) {
      const categories = kickstarters.children.map((item) => item.name);

      const colorScale = d3
        .scaleOrdinal()
        .domain(categories)
        .range(d3.schemeCategory10);

      const width = 1000;
      const height = 1000;

      const treemap = d3.treemap().size([width, height]).padding(0.5);

      const root = d3
        .hierarchy(kickstarters)
        .sum((d) => d.value)
        .sort(
          (a, b) =>
            b.height - a.height ||
            b.value - a.value ||
            a.data.name.localeCompare(b.data.name)
        );

      treemap(root);

      const svg = d3
        .select("#treemap")
        .attr("width", width)
        .attr("height", height);

      const tiles = svg
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

      const tooltip = d3
        .select("#tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("background-color", "black")
        .style("color", "white")
        .style("border", "2px solid white")
        .style("border-radius", "10px")
        .style("padding", "5px")
        .style("width", "200px");

      tiles
        .append("rect")
        .attr("class", "tile")
        .attr("data-category", (d) => d.data.category)
        .attr("data-value", (d) => d.data.value)
        .attr("data-name", (d) => d.data.name)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("fill", (d) => colorScale(d.data.category))
        .on("mouseover", (event, d) => {
          tooltip
            .attr("data-value", d.data.value)
            .style("opacity", 0.9)
            .html(
              `Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`
            );
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY}px`);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });

      tiles
        .append("text")
        .selectAll("tspan")
        .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
        .enter()
        .append("tspan")
        .attr("x", 4)
        .attr("y", (d, i) => 15 + i * 15)
        .attr("fill", "white")
        .attr("font-size", "12px")
        .text((d) => d);

      const legend = d3.select("#legend");

      const legendItems = legend
        .selectAll(".legend-item")
        .data(categories)
        .enter()
        .append("rect")
        .attr("class", "legend-item")
        .attr("data-category", (d) => d)
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 0)
        .attr("y", (_, i) => i * 30)
        .attr("fill", (d) => colorScale(d));

      legendItems
        .append("span")
        .attr("class", "legend-color")
        .style("background-color", (d) => colorScale(d));

      legendItems
        .append("span")
        .attr("class", "legend-text")
        .text((d) => d);
    }
  });

  return (
    <div className="App">
      <h1 id="title">Kickstarter Pledges</h1>
      <h4 id="description">
        Top 100 Most Pledged Kickstarter Campaigns Grouped By Category
      </h4>
      <div className="map">
        <svg id="treemap"></svg>
      </div>
      <div id="tooltip"></div>
      <div id="legend"></div>
    </div>
  );
}

export default Kickstarter;
