import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

interface DataPoint {
    x: number;
    y: number;
}

const D3DraggableLineChart: React.FC = ({data}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [xDomain, setXDomain] = useState<[number, number] | null>(null);
    const width = 800;
    const height = 400;
    const margin = {top: 20, right: 20, bottom: 40, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const xScale = d3.scaleLinear()
            .domain(xDomain || d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y) as number])
            .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // g.append("g")
        //     .attr("transform", `translate(0, ${innerHeight})`)
        //     .call(xAxis);

        g.selectAll(".x-axis")
            .data([null]) // используем массив с одним пустым элементом для создания или обновления одной группы
            .join(
                enter => enter.append("g").attr("class", "x-axis"),
                update => update,
                exit => exit.remove()
            )
            .attr("transform", `translate(0, ${innerHeight})`)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .call(xAxis);


        g.append("g").call(yAxis);

        const lineGenerator = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        const path = g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", lineGenerator)
        ;
        const dragHandler = d3.drag<SVGSVGElement, unknown>()
            .on("drag", event => {
                const dx = event.dx;
                const [xMin, xMax] = xScale.domain();
                const domainWidth = xMax - xMin;
                const domainShift = (dx / innerWidth) * domainWidth;
                const newDomain = [xMin - domainShift, xMax - domainShift];
                //setXDomain(() => newDomain); // Save the current domain for consistent dragging
                xScale.domain(newDomain);
                g.select(".x-axis").call(xAxis);
                path.attr("d", lineGenerator);
            });

        dragHandler(svg);
    }, [data]);
    return <svg ref={svgRef} width={width} height={height}></svg>;
}

export default D3DraggableLineChart;
