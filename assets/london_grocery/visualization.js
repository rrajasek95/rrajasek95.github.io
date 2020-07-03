/**
 * Visualization of London Grocery Consumption Habits
 * 
 * 
 * The base implementation was derived from the tutorial:
 * https://bost.ocks.org/mike/map/ (by Mike Bostock)
 */

 
let marginLeft = 60;


let width = 540,
    height = 540;

let scatterPlotWidth = 600,
    scatterPlotHeight = 600;

let mapSvg = d3.select("svg#canvas")
    .attr("width", width)
    .attr("height", height);

let scatterSvg = d3.select("svg#scatterplot")
    .attr("width", scatterPlotWidth + marginLeft)
    .attr("height", scatterPlotHeight + 20);

let months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'year' // Special field for yearly data
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


    let yearlyData = monthWiseData[12];

    let areaWiseData = {};
    let fieldWiseData = {};

    let fields = ['alcohol']
    for (let i = 0 ; i < yearlyData.length ; i++) {
        areaWiseData[yearlyData[i].area_id] = yearlyData[i];

        for (let j = 0 ; j < fields.length ; j++) {
            if (fieldWiseData[fields[j]] === undefined) {
                fieldWiseData[fields[j]] = [];
            }

            fieldWiseData[fields[j]].push(yearlyData[i][fields[j]]);
        }
    }

    let monthWiseFieldData = {};
    
    for (const [area, data] of Object.entries(areaWiseData)) {
        let dataIndexed = new Array(12);

        for (let i = 0 ; i < 12 ; i++) {
            for (let j = 0 ; j < monthWiseData[i].length ; j++) {
                if (monthWiseData[i][j].area_id == area) {
                    dataIndexed[i] = monthWiseData[i][j];
                }
            }
            
        }

        monthWiseFieldData[area] = dataIndexed;
    }

    let fieldWiseQuantile = {};
    let fieldWiseXrange = {};

    for (let j = 0 ; j < fields.length ; j++) {
        fieldWiseQuantile[fields[j]] = d3.scaleQuantile().domain(fieldWiseData[fields[j]]).range(d3.schemeBlues[9]);
        fieldWiseXrange[fields[j]] = d3.scaleQuantile().domain(fieldWiseData[fields[j]]).range([300, 330, 360, 390, 420, 450, 480, 510, 540, 570, 600 ]);
    }

    // The color scheme is based on dividing consumption into quantiles
    drawMap(fieldWiseQuantile, fields, fieldWiseXrange, data, areaWiseData, monthWiseFieldData);

 });

function drawMap(fieldWiseQuantile, fields, fieldWiseXrange, data, areaWiseData, monthWiseFieldData) {
    let quantile = fieldWiseQuantile[fields[0]];
    let xRange = fieldWiseXrange[fields[0]];
    let g = mapSvg.append("g").attr("class", "legend").attr("transform", "translate(0, 40)");

    g.selectAll("rect")
        .data(quantile.range().map(function (d) {
            d = quantile.invertExtent(d);
            if (d[0] == null)
                d[0] = xRange.domain()[0];
            if (d[1] == null)
                d[1] = xRange.domain()[1];
            return d;
        }))
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", function (d) {
            return xRange(d[0]);
        })
        .attr("width", function (d) {
            return xRange(d[1]) - xRange(d[0]);
        })
        .attr("fill", function (d) { return quantile(d[0]); });
    g.append("text")
        .attr("class", "caption")
        .attr("x", xRange.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Consumption");
    g.call(d3.axisBottom(xRange)
        .tickSize(9)
        .tickValues(quantile.domain()))
        .select(".domain")
        .remove();


    let json = data[1];
    let topology = json;
    let projection = d3.geoMercator();
    projection.fitExtent([[0, 0], [width, height]], topology);
    let path = d3.geoPath().projection(projection);
    mapSvg
        .selectAll("path")
        .append("path")
        .data(topology.features)
        .enter()
        .append('path')
        .attr("d", path)
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
            let area = feature.properties.GSS_CODE;
            // D3 code derived from: https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
            div.transition().duration(200).style("opacity", .9);
            div.html(`
                ${name}
            `)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            scatterSvg.html("");
            drawLinePlotForAreaField(name, fields[0], monthWiseFieldData[area]);
        })
        .on('mouseout', (feature) => {
            div.transition().duration(500).style("opacity", 0);            
        });
}

function drawLinePlotForAreaField(name, field, monthWiseFieldData) {


    let fieldData = [];

    for (let i = 0 ; i < 12 ; i++) {
        fieldData.push(+monthWiseFieldData[i][field]);
    }
    let x = d3.scaleBand()
    .domain(months.slice(0, 12)).range([marginLeft, scatterPlotWidth]);


    scatterSvg.append("g")
        .attr("transform", `translate(0, ${scatterPlotHeight})`)
        .call(d3.axisBottom(x));

    let y = d3.scaleLinear()
        .domain([0, d3.max(fieldData)])
        .range([scatterPlotHeight, 0]);

    scatterSvg.append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", `rotate(-90) translate(-${scatterPlotHeight/2}, -30)`)
        .text(`${name} consumption`)
        .attr("fill", "black");

    scatterSvg.append("path")
        .datum(fieldData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line().curve(d3.curveBasis)
        .x((d, i) => x(months[i]) )
        .y(d => y(d) ));
    
}