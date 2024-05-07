import React, {useRef, useEffect, useState, useCallback} from "react";
import * as d3 from "d3";
import dayjs from "dayjs";

interface LineChartProps {
    data: { x: number; y: number }[];
    width: number;
    height: number;
}

const margin = {top: 20, right: 30, bottom: 40, left: 50};

const SegmentsLineChart: React.FC<LineChartProps> = ({data, width = 800, height = 300}) => {
    const ref = useRef<SVGSVGElement>(null);

    const [transform, setTransform] = useState(d3.zoomIdentity);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data.flat(), d => d.x) as [number, number])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data.flat(), d => d.y) as [number, number])
        .range([innerHeight, 0]);

    useEffect(() => {
        const svg = d3.select(ref.current);
        const zoom = d3.zoom<SVGSVGElement, unknown>()
            // .scaleExtent([1, 10])
            .filter(event => {
                // Разрешить zoom при использовании колесика мыши и зажатом ctrl
                if (event.type === "wheel" && event.ctrlKey) return true;
                // Разрешить panning только при использовании средней кнопки мыши
                return event.button === 1;
            })
            .on("zoom", (event) => {
                setTransform(event.transform)
            })
        svg.call(zoom)


        //Доп
        svg.on("click", (event) => {
            // setTransform(d3.zoomIdentity)
            svg.transition()
                .duration(750)
                .call(zoom.transform, d3.zoomIdentity)
        })
    }, []);

    const transformedLine = d3.line<{ x: number; y: number }>()
        .x(d => transform.rescaleX(xScale)(d.x))
        .y(d => transform.rescaleY(yScale)(d.y));


    return (
        <div style={{width, height}}>
            <svg ref={ref} width="100%" height="100%">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {data.map((d, i) => {
                        return <path d={transformedLine(d)} fill="none" stroke={i === 0 ? "green" : "blue"}
                                     strokeWidth="2"/>
                    })}
                    <g transform={`translate(${0},${innerHeight})`}>
                        <line x2={innerWidth} stroke={"black"}/>
                        {transform.rescaleX(xScale).ticks(5).map((tick, i) => <g
                            key={i}
                            transform={`translate(${transform.rescaleX(xScale)(tick)},0)`}>
                            <line y2={10} stroke={"black"}></line>
                            <text y={25} textAnchor={"middle"} fontSize={"12px"}
                            >{dayjs(tick).format("DD.MM.YYYY")}</text>
                        </g>)}
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default SegmentsLineChart;
