import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

interface DataPoint {
    x: number;
    y: number;
}

const D3GradientLineChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const data: DataPoint[] = [
        {x: 1, y: 2},
        {x: 2, y: 3},
        {x: 3, y: 5},
        {x: 4, y: 4},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 9},
        {x: 8, y: 10},
        {x: 9, y: 8}
    ];
    const width = 800;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();


        const yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([innerHeight, 0]);

        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(d3.max(data, d => d.y)!));

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "black");

        gradient.append("stop")
            .attr("offset", "33%")
            .attr("stop-color", "black");

        gradient.append("stop")
            .attr("offset", "33%")
            .attr("stop-color", "red");

        gradient.append("stop")
            .attr("offset", "66%")
            .attr("stop-color", "red");

        gradient.append("stop")
            .attr("offset", "66%")
            .attr("stop-color", "green");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "green");

        const xScale = d3.scaleLinear()
            .domain([1, 9])
            .range([0, innerWidth]);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 2)
            .attr("d", d3.line<DataPoint>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y))
            );

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale));
    }, []);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default D3GradientLineChart;
