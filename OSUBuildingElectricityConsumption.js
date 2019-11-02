/**
 * Generates a bubble chart that displays the relative electricity consumption of each building on the OSU campus, color-coded by category
 *
 * Created by: Kate Luckerman
 *
 * @requires d3.v4.js
 * 
 */
function bubbleChart(font) {
    var width = 960,
        height = 1000,
        marginTop = 96,
        minRadius = 3,
        maxRadius = 40,
        columnForColors = "Category",
        columnForTitle = "Building",
        columnForRadius = "Value",
        forceApart = -10,
        unitName = "kWh/day",
        customColors = true,
        acadres = "#bb0000",
        stuhousact = "#000000",
        pubfac = "#839ec1",
        athlet = "#442369",
        facadmin = "#666666",
        medvet = "#909738",
        customRange = [acadres, acadres, acadres, facadmin, acadres, athlet, pubfac, facadmin, facadmin, pubfac, acadres, pubfac, pubfac, facadmin, medvet, medvet, acadres, stuhousact, stuhousact, medvet],
        customDomain = ["Academic", "Academic/Research", "Academic/Administration", "Administration", "Agricultural", "Athletics", "Auditorium", "Facilities", "Facilities/Administration", "Hotel", "Lab", "Library", "Museum", "Office", "OSUWMC", "Patient Care/Research", "Research", "Student Activity", "Student Housing", "Veterinary" ],
        chartSelection,
        chartSVG,
        showTitleOnCircle = false;

	/**
	 * The command to actually render the chart after setting the settings.
	 * @public
	 * @param {string} selection - The div ID that you want to render in 
	 */
    function chart(selection) {
        var data = selection.datum();
        chartSelection = selection;
        var div = selection,
            svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);
        chartSVG = svg;

        var tooltip = selection
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#8BC0DE")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", font)
            .style("width", "400px")
            .text("");


        var simulation = d3.forceSimulation(data)
            .force("charge", d3.forceManyBody().strength([forceApart]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("transform", function (d) {
                return "translate(" + [d.x + (width / 2), d.y + ((height + marginTop) / 2)] + ")";
            });
        }

        var colorCircles;
        if (!customColors) {
            colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        }
        else {
            colorCircles = d3.scaleOrdinal()
                .domain(customDomain)
                .range(customRange);
        }

        var minRadiusDomain = d3.min(data, function (d) {
            return +d[columnForRadius];
        });
        var maxRadiusDomain = d3.max(data, function (d) {
            return +d[columnForRadius];
        });
        var scaleRadius = d3.scaleLinear()
            .domain([minRadiusDomain, maxRadiusDomain])
            .range([minRadius, maxRadius])

        var node = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("g")
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .style('opacity', 1);

        node.append("circle")
            .attr("id", function (d, i) {
                return i;
            })
            .attr('r', function (d) {
                return scaleRadius(d[columnForRadius]);
            })
            .style("fill", function (d) {
                return colorCircles(d[columnForColors]);
            })
            .on("mouseover", function (d) {
                tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " " + unitName);
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function () {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });
        node.append("clipPath")
            .attr("id", function (d, i) {
                return "clip-" + i;
            })
            .append("use")
            .attr("xlink:href", function (d, i) {
                return "#" + i;
            });
        if (showTitleOnCircle) {
            node.append("text")
                .attr("clip-path", function (d, i) {
                    return "url(#clip-" + i + ")"
                })
                .attr("text-anchor", "middle")
                .append("tspan")
                .attr("x", function (d) {
                    return 0;//-1*scaleRadius(d[columnForRadius])/3;
                })
                .attr("y", function (d) {
                    return ".3em";//scaleRadius(d[columnForRadius])/4;
                })
                .text(function (d) {
                    return d[columnForTitle];
                })
                .on("mouseover", function (d) {
                    tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " " + unitName);
                    return tooltip.style("visibility", "visible");
                })
                .on("mousemove", function () {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function () {
                    return tooltip.style("visibility", "hidden");
                });
        }

        svg.append('text')
            .attr('x', width / 2).attr('y', marginTop)
            .attr("text-anchor", "middle")
            .attr("font-size", "1.8em")
            .text(title);
    }

    return chart;
}