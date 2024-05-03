import React, {useState} from "react";
import * as d3 from "d3";

type DataPoint = { x: number; y: number };
type Props = { data: DataPoint[]; width: number; height: number };

const LineChart: React.FC<Props> = ({data, width, height}) => {
    const margin = {top: 20, right: 20, bottom: 20, left: 60};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Создание масштабов
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x) as [number, number])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y)!])
        .range([innerHeight, 0]);

    // Генерация линии с помощью D3
    const lineGenerator = d3.line<DataPoint>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
    //.curve(d3.curveMonotoneX); // Сглаживание линии

    const line = lineGenerator(data);


    const [tooltip, setTooltip] = useState<{ x: number; y: number; value: string } | null>(null);

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        console.log(rect, event)
        const xPos = event.clientX - rect.left - margin.left; // Учет смещения SVG и отступа
        const x0 = xScale.invert(xPos);
        const bisector = d3.bisector<DataPoint, number>(d => d.x).left;
        const index = bisector(data, x0, 1);
        const a = data[index - 1];
        const b = data[index];
        const closestPoint = b && (x0 - a.x > b.x - x0) ? b : a;
        if (closestPoint) {
            setTooltip({
                x: xScale(closestPoint.x),
                y: yScale(closestPoint.y),
                value: `X: ${closestPoint.x}, Y: ${closestPoint.y}`
            });
        }
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    return (
        <svg width={width} height={height} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {<g transform={`translate(${margin.left}, ${margin.top})`}>
                <path d={line || ""} fill="none" stroke="blue" strokeWidth={2}/>
                <XAxis data={data} xScale={xScale} innerHeight={innerHeight} innerWidth={innerWidth}/>
                <YAxis data={data} yScale={yScale} innerHeight={innerHeight} innerWidth={innerWidth}/>
                {tooltip && (
                    <g>
                        <circle cx={tooltip.x} cy={tooltip.y} r={5} fill="red"/>
                        <text x={tooltip.x + 30} y={tooltip.y} fill="black" textAnchor="middle"
                              dy="0.32em" style={{fontSize: "10px"}}
                        >
                            {tooltip.value}
                        </text>
                    </g>
                )}
            </g>}
        </svg>
    );
};

const YAxis = ({data, yScale, innerWidth, innerHeight}) => {
    const numTicks = 7; // Желаемое количество тиков
    const [minX, maxX] = d3.extent(data, d => d.y);
    const tickInterval = (maxX - minX) / (numTicks - 1);
    const ticks = Array.from({length: numTicks}, (_, i) => minX + i * tickInterval);

    return (
        <g>
            <line x1={0} y1={0} x2={0} y2={innerHeight} stroke="black"/>
            {
                ticks.map((tick, index) => {
                    return <g key={index} transform={`translate(${0}, ${yScale(tick)})`}>
                        <line x2={-5} stroke="black"/>
                        <text fill="black" x={-10} textAnchor="end" dy="0.32em" style={{fontSize: "10px"}}>
                            {tick.toFixed(2)}
                        </text>
                    </g>
                })
            }
        </g>
    )
}

const XAxis = ({data, xScale, innerWidth, innerHeight}) => {
    const numTicks = 7; // Желаемое количество тиков
    const [minX, maxX] = d3.extent(data, d => d.x);
    const tickInterval = (maxX - minX) / (numTicks - 1);
    const ticks = Array.from({length: numTicks}, (_, i) => minX + i * tickInterval);

    return (
        <g>
            <line x1={0} y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke="black"/>
            {
                ticks.map((tick, index) => {
                    return <g key={index} transform={`translate(${xScale(tick)}, ${innerHeight})`}>
                        <line y2={5} stroke="black"/>
                        <text fill="black" y={15} textAnchor="middle" style={{fontSize: "10px"}}>
                            {tick.toFixed(2)}
                        </text>
                    </g>
                })
            }
        </g>
    )
}
export default LineChart;
