import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";

type Props = {
    data: DataPoint[];
    width: number;
    height: number;
};

type DataPoint = { x: number, y: number }
const Zoom: React.FC<Props> = ({data, width = 400, height = 300}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const margin = {top: 20, right: 30, bottom: 30, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);

    const [xScale, setXScale] = useState<d3.ScaleLinear<number, number>>(() => d3.scaleLinear());
    const [yScale, setYScale] = useState<d3.ScaleLinear<number, number>>(() => d3.scaleLinear());

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const zoomBehavior = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 5])
            // .translateExtent([[0, 0], [width, height]])
            .on("zoom", (event) => {
                console.log(event)
                const updatedXScale = transform.rescaleX(xScale);
                const updatedYScale = transform.rescaleY(yScale);
                setTransform(event.transform);

                setXScale(() => updatedXScale)
                setYScale(() => updatedYScale)
            });

        svg.call(zoomBehavior);
    }, [width, height, transform, xScale, yScale]);

    useEffect(() => {
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth])
            .nice();

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.y) as [number, number])
            .range([innerHeight, 0])
            .nice();
        setXScale(() => xScale)
        setYScale(() => yScale)
    }, [data, innerHeight, innerWidth]);

    const lineGenerator = d3.line<{ x: number; y: number }>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

    return (
        <div>
            <svg ref={svgRef} width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <g transform={transform.toString()}>
                        <path d={lineGenerator(data) && ""} fill="none" stroke="blue" strokeWidth="2"/>
                        <g>
                            {data.map((d, i) => (
                                <circle key={i} cx={xScale(d.x)} cy={yScale(d.y)} r="3" fill="red"/>
                            ))}
                        </g>
                    </g>
                    <g className="axis-x" transform={`translate(0,${innerHeight})`}>
                        {xScale.ticks().map((tickValue, i) => (
                            <g key={i} transform={`translate(${xScale(tickValue)},0)`}>
                                <line y2="6" stroke="black"/>
                                <text y="9" dy=".71em" textAnchor="middle">{tickValue}</text>
                            </g>
                        ))}
                    </g>
                    <g className="axis-y">
                        {yScale.ticks().map((tickValue, i) => (
                            <g key={i} transform={`translate(0,${yScale(tickValue)})`}>
                                <line x2="-6" stroke="black"/>
                                <text x="-9" dy=".32em" textAnchor="end">{tickValue}</text>
                            </g>
                        ))}
                    </g>
                </g>
            </svg>
        </div>
    );
};

export default Zoom;
