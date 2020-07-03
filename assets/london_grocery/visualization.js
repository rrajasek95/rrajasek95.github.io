/**
 * Visualization of London Grocery Consumption Habits
 * 
 * 
 * The base implementation was derived from the tutorial:
 * https://bost.ocks.org/mike/map/ (by Mike Bostock)
 */

 


let width = 600,
    height = 600;

let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

let months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

let monthCsvs = [];

for (let i = 0; i < months.length ; i++) {
    monthCsvs.push(d3.csv(`Grocery_Data/${months[i]}_osward_grocery.csv`));
}

let csvPromises = Promise.all(monthCsvs);
let jsonPromise = d3.json("London_Ward_CityMerged.json");

let div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
Promise.all([csvPromises, jsonPromise]).then(function(data) {
    let monthWiseData = data[0];

    // To simplify, let's look at December's distribution
    console.log(monthWiseData);


    let decemberData = monthWiseData[11];

    let areaWiseData = {};
    let fieldWiseData = {};

    let fields = ['alcohol']
    for (let i = 0 ; i < decemberData.length ; i++) {
        areaWiseData[decemberData[i].area_id] = decemberData[i];

        for (let j = 0 ; j < fields.length ; j++) {
            if (fieldWiseData[fields[j]] === undefined) {
                fieldWiseData[fields[j]] = [];
            }

            fieldWiseData[fields[j]].push(decemberData[i][fields[j]]);
        }
    }

    let fieldWiseQuantile = {};
    let fieldWiseXrange = {};

    for (let j = 0 ; j < fields.length ; j++) {
        fieldWiseQuantile[fields[j]] = d3.scaleQuantile().domain(fieldWiseData[fields[j]]).range(d3.schemeBlues[9]);
        fieldWiseXrange[fields[j]] = d3.scaleQuantile().domain(fieldWiseData[fields[j]]).range([300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600 ]);
    }

    // The color scheme is based on dividing consumption into quantiles
    let quantile = fieldWiseQuantile[fields[0]]
    let xRange = fieldWiseXrange[fields[0]];
    let g = svg.append("g").attr("class", "legend").attr("transform", "translate(0, 40)");

    g.selectAll("rect")
     .data(quantile.range().map(function (d) {
        d = quantile.invertExtent(d);
        console.log(d);
        if (d[0] == null) d[0] = xRange.domain()[0];
        if (d[1] == null) d[1] = xRange.domain()[1];
        return d;
     }))
     .enter().append("rect")
     .attr("height", 8)
     .attr("x", function(d) { 
         return xRange(d[0]); })
     .attr("width", function(d) { 
        return xRange(d[1]) - xRange(d[0]); })
     .attr("fill", function(d) { return quantile(d[0]); });
    g.append("text")
    .attr("class", "caption")
    .attr("x", xRange.range()[0])
    .attr("y", -6)
    .attr("fill", "#000")
    .attr("text-anchor", "start")
    .attr("font-weight", "bold")
    .text("Consumption");
    g.call(d3.axisBottom(xRange)
        .tickSize(10)
        .tickValues(quantile.domain()))
        .select(".domain")
        .remove();


    let json = data[1];
    let topology = json;
    let projection = d3.geoMercator();
    projection.fitExtent([[0, 0], [width, height]], topology)
    let path = d3.geoPath().projection(projection);
    svg
        .selectAll("path")
        .append("path")
        .data(topology.features)
        .enter()
        .append('path')
        .attr("d",path)
        .attr("fill", feature => {
            let areaCode = feature.properties.GSS_CODE;
            let areaData = areaWiseData[areaCode];
            if (areaData) {
                return quantile(areaData[fields[0]]);
            }
            return 0;
        })
        .on('mouseover', (feature) => {
            let name = feature.properties.NAME;
            // D3 code derived from: https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
            div.transition().duration(200).style("opacity", .9);
            div.html(`
                ${name}
            `)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on('mouseout', (feature) => {
            
            div.transition().duration(500).style("opacity", 0);
        });

 });