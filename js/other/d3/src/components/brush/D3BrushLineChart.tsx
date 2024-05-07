import React, {useRef, useEffect} from "react";
import * as d3 from "d3";

interface LineChartProps {
    data: { x: number; y: number }[];
    width: number;
    height: number;
}

const margin = {top: 20, right: 30, bottom: 40, left: 50};

const D3BrushLineChart: React.FC<LineChartProps> = ({data, width = 800, height = 300}) => {
    const ref = useRef<SVGSVGElement>(null);


    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current);
            // svg.selectAll("*").remove(); // Очищаем предыдущие графики

            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x) as [number, number])
                .range([0, innerWidth]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y) as [number, number])
                .range([innerHeight, 0]);

            const xAxis = d3.axisBottom(xScale).ticks(10);
            const yAxis = d3.axisLeft(yScale).ticks(10);

            const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const gx = g.append("g").attr("transform", `translate(0,${innerHeight})`);
            const gy = g.append("g");

            gx.call(xAxis);
            gy.call(yAxis);

            const line = d3.line<{ x: number; y: number }>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            const path = g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("d", line);

            const brush = d3.brush().extent([[0, 0], [innerWidth, innerHeight]])
                .on("brush", (event) => {
                    console.log(event)
                })
                .on("end", (event) => {
                });
            g.call(brush);
        }
    }, [data, width, height]);

    return <div style={{width, height}}>
        <svg ref={ref} width={"100%"} height={"100%"}/>
    </div>
}

export default D3BrushLineChart;
