import * as d3 from "d3";

const XAxis = ({data, xScale, innerWidth, innerHeight }) => {
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
                        <text fill="black" y={15} textAnchor="middle" style={{fontSize: "10px"}} >
                            {tick.toFixed(2)}
                        </text>
                    </g>
                })
            }
        </g>
    )
}

export default XAxis
