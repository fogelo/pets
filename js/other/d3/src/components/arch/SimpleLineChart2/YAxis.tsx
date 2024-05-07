import * as d3 from "d3";

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

export default YAxis
