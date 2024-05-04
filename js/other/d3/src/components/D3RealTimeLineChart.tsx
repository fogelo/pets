import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

interface DataPoint {
    x: number;
    y: number;
}

interface LineChartProps {
    data: DataPoint[];
}

const SimpleLineChart: React.FC<LineChartProps> = ({data}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const gRef = useRef<SVGGElement | null>(null);

    const width = 800;
    const height = 400;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const [xScale, setXScale] = useState<d3.ScaleLinear<number, number>>(d3.scaleLinear());
    const [yScale, setYScale] = useState<d3.ScaleLinear<number, number>>(d3.scaleLinear());


    // Обновление доменов шкалы
    useEffect(() => {
        const newXScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]);

        const newYScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y) as number])
            .range([innerHeight, 0]);

        setXScale(newXScale);
        setYScale(newYScale);
    }, [data]); // зависимость только от изменения данных

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const g = d3.select(gRef.current);

        const xMax = d3.max(data, d => d.x)
        const xMin = xMax - 864000000/10
        const xDomain = [xMin, xMax] as [number, number]
        const yDomain = [0, d3.max(data, d => d.y)] as [number, number]

        // Scales
        const xScale = d3.scaleLinear()
            .domain(xDomain)
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([innerHeight, 0]);

        // setXScale(() => d3.scaleLinear()
        //     .domain(d3.extent(data, d => d.x) as [number, number])
        //     .range([0, innerWidth]));
        //
        // setYScale(() => d3.scaleLinear()
        //     .domain([0, d3.max(data, d => d.y) as number])
        //     .range([innerHeight, 0]));

        // Clear previous contents
        // g.selectAll("*").remove();

        // Line generator for the full line
        const lineGenerator = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        // Draw the full line
        d3.select(gRef.current).selectAll("path")
            .data([data])
            .join("path")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr("d", lineGenerator)

        // Select the last three points for the animated segment
        const lastThreePoints = data.slice(-3);

        // Draw and animate the last segment
        if (lastThreePoints.length === 3) {
            const path = g.append("path")
                .datum(lastThreePoints)
                .attr("fill", "none")
                .attr("stroke", "red")  // Different color to highlight
                .attr("stroke-width", 2)
                .attr("d", lineGenerator)

            const totalLength = path.node()!.getTotalLength();

            path.attr("stroke-dasharray", `${totalLength} ${totalLength}`)
                .attr("stroke-dashoffset", totalLength)
                .transition()  // Transition to animate
                .duration(500)  // Duration in milliseconds
                .ease(d3.easeLinear)  // Linear animation
                .attr("stroke-dashoffset", 0);
        }

        // Axes
        const xAxis = d3.axisBottom(xScale).ticks(5)
        const yAxis = d3.axisLeft(yScale)

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

        // g.append("g")
        //     .call(yAxis);

        // Управление группой оси Y
        g.selectAll(".y-axis")
            .data([null]) // аналогично для оси Y
            .join(
                enter => enter.append("g").attr("class", "y-axis"),
                update => update,
                exit => exit.remove()
            )
            .call(yAxis);

    }, [data]);

    return <svg ref={svgRef} width={width} height={height}>
        <g ref={gRef} transform={`translate(${margin.left}, ${margin.top})`}></g>
    </svg>;
};

export default SimpleLineChart;

interface DataPoint {
    x: number; // Предполагается, что это временной штамп
    y: number;
}

interface LineChartProps {
    data: DataPoint[];
}

const SimpleLineChart2: React.FC<LineChartProps> = ({data}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [xScale, setXScale] = useState<d3.ScaleLinear<number, number>>(d3.scaleLinear());
    const [yScale, setYScale] = useState<d3.ScaleLinear<number, number>>(d3.scaleLinear());

    const width = 800;
    const height = 400;
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Обновление шкал
    useEffect(() => {
        setXScale(() => d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]));

        setYScale(() => d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y) as number])
            .range([innerHeight, 0]));
    }, [data]);

    // Эффект для анимации оси X
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const g = svg.select("g");

        // Обновление линии
        const lineGenerator = d3.line<DataPoint>()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        const line = g.select<SVGPathElement>("path");
        line.datum(data)
            .attr("d", lineGenerator);

        // Плавная анимация оси X
        const xAxis = d3.axisBottom(xScale).ticks(5);
        g.select(".x-axis")
            .transition()
            .duration(1000)
            .ease(d3.easeLinear)
            .call(xAxis);

    }, [data, xScale, yScale]);

    // Первоначальная отрисовка SVG
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.attr("width", width).attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const g = svg.select("g");
        g.append("path").attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2);
        g.append("g").attr("class", "x-axis").attr("transform", `translate(0,${innerHeight})`);
        g.append("g").attr("class", "y-axis");

        const yAxis = d3.axisLeft(yScale);
        g.select(".y-axis").call(yAxis);
    }, []);

    return <svg ref={svgRef}></svg>;
};
