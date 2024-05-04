import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    x: number;
    y: number;
}

const D3GradientLineChart: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [data, setData] = useState<DataPoint[]>([
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 7 },
        { x: 6, y: 6 },
        { x: 7, y: 9 },
        { x: 8, y: 10 },
        { x: 9, y: 8 }
    ]);
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y) as number])
            .range([innerHeight, 0]);

        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const lineGenerator = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        const numberOfSegments = 3;
        const segmentLength = Math.ceil(data.length / numberOfSegments);

        for (let i = 0; i < numberOfSegments; i++) {
            const segmentData = data.slice(i * segmentLength, (i + 1) * segmentLength);
            g.append("path")
                .datum(segmentData)
                .attr("fill", "none")
                .attr("stroke", ["black", "red", "green"][i])
                .attr("stroke-width", 2)
                .attr("d", lineGenerator);
        }

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g")
            .call(d3.axisLeft(yScale));
    }, [data]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default D3GradientLineChart;
