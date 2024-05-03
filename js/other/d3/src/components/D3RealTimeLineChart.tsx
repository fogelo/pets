import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    x: number;
    y: number;
}

const SimpleLineChart: React.FC = () => {
    const ref = useRef<SVGSVGElement | null>(null);
    const [data, setData] = useState<DataPoint[]>([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 16 },
        { x: 5, y: 25 } // Added another data point for better effect
    ]); // Example data

    useEffect(() => {
        const svg = d3.select(ref.current);
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)!)
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)!])
            .range([innerHeight, 0]);

        // Line generator for the full line
        const lineGenerator = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        svg.attr('width', width)
            .attr('height', height)
            .style('overflow', 'visible');

        // Clear previous contents
        svg.selectAll("*").remove();

        // Draw the full line
        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Select the last three points for the animated segment
        const lastThreePoints = data.slice(-3);

        // Draw and animate the last segment
        if (lastThreePoints.length === 3) {
            const path = svg.append('path')
                .datum(lastThreePoints)
                .attr('fill', 'none')
                .attr('stroke', 'red')  // Different color to highlight
                .attr('stroke-width', 2)
                .attr('d', lineGenerator)
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const totalLength = path.node()!.getTotalLength();

            path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                .attr('stroke-dashoffset', totalLength)
                .transition()  // Transition to animate
                .duration(1000)  // Duration in milliseconds
                .ease(d3.easeLinear)  // Linear animation
                .attr('stroke-dashoffset', 0);
        }

        // Axes
        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

    }, [data]);

    return <svg ref={ref}></svg>;
};

export default SimpleLineChart;
