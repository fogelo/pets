import React, {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

// Определение типа для одной точки данных
interface DataPoint {
    x: number;
    y: number;
}

// Определение props для компонента
interface LineChartProps {
    data: DataPoint[];
    width: number
    height: number
    margin: { top: number, right: number, bottom: number, left: number }
}

const LineChart: React.FC<LineChartProps> = ({
                                                 data,
                                                 width = 400,
                                                 height = 300,
                                                 margin = {top: 20, right: 0, bottom: 20, left: 60}
                                             }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    const [xScale, setXScale] = useState<d3.ScaleLinear<number, number, never>>(d3.scaleLinear())
    const [yScale, setYScale] = useState<d3.ScaleLinear<number, number, never>>(d3.scaleLinear())
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    useEffect(() => {
        // Очищаем svg перед добавлением новых элементов
        // svg.selectAll("*").remove();

        // Создаем шкалы
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.x) as [number, number])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)!])
            .range([innerHeight, 0]);

        setXScale(() => xScale)
        setYScale(() => yScale)
        // Отрисовка линии
    }, [data, height, margin.bottom, margin.left, margin.right, margin.top, width]);

    return <div style={{display: "inline-block", height: height, overflow: "hidden"}}>
        <svg ref={svgRef} width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <Line data={data} xScale={xScale} yScale={yScale}/>
                <XAxis data={data} xScale={xScale} innerHeight={innerHeight}/>
                <YAxis data={data} yScale={yScale}/>
                <Brush xScale={xScale} setXScale={setXScale} innerHeight={innerHeight} innerWidth={innerWidth}/>
            </g>
        </svg>
    </div>
};


interface LineProps {
    data: DataPoint[]
    xScale: any
    yScale: any
}

const Line: React.FC<LineProps> = ({data, xScale, yScale}: any) => {
    const gRef = useRef(null);

    useEffect(() => {
        if (xScale && yScale) {
            const line = d3.line<DataPoint>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            d3.select(gRef.current)
                .selectAll("path")
                .data([data])
                .join("path")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);
        }
    }, [data, xScale, yScale]);

    return <g ref={gRef}/>;
};

interface XAxisProps {
    data: DataPoint[]
    xScale: any
    innerHeight: number
}

const XAxis: React.FC<XAxisProps> = ({data, xScale, innerHeight}) => {
    const xAxisRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (xScale && data && data.length > 0) {
            const [minX, maxX] = d3.extent(data, d => d.x);
            if (typeof minX === "number" && typeof maxX === "number") {
                const numTicks = 5; // Желаемое количество тиков
                const tickInterval = (maxX - minX) / (numTicks - 1);
                const ticks = Array.from({length: numTicks}, (_, i) => minX + i * tickInterval);

                const xAxis = d3.axisBottom<number>(xScale)
                    .tickValues(ticks) // Использование вычисленных значений тиков
                    .tickFormat(d3.format(".2f")); // Форматирование тиков до двух десятичных знаков

                // Вызываем xAxis для создания оси X
                if (xAxisRef.current) {
                    d3.select(xAxisRef.current)
                        .call(xAxis);
                }
            }

        }
    }, [xScale, innerHeight, data]);

    return (
        <g ref={xAxisRef} transform={`translate(0, ${innerHeight})`}/>
    );
}

interface YAxisProps {
    data: DataPoint[]
    yScale: any
}

const YAxis: React.FC<YAxisProps> = ({data, yScale}) => {
    const yAxisRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (yScale && data && data.length > 0) {
            const [minY, maxY] = d3.extent(data, d => d.y);
            if (typeof minY === "number" && typeof maxY === "number") {
                const numTicks = 5; // Желаемое количество тиков
                const tickInterval = (maxY - minY) / (numTicks - 1);
                const ticks = Array.from({length: numTicks}, (_, i) => minY + i * tickInterval);

                const yAxis = d3.axisLeft<number>(yScale)
                    .tickValues(ticks) // Использование вычисленных значений тиков
                    .tickFormat(d3.format(".2f")); // Форматирование тиков до двух десятичных знаков

                // Вызываем xAxis для создания оси X
                if (yAxisRef.current) {
                    d3.select(yAxisRef.current)
                        .call(yAxis);
                }
            }

        }
    }, [yScale, innerHeight, data]);

    return (
        <g ref={yAxisRef}/>
    );
}

interface BrushProps {
    xScale: any
    setXScale: any
    innerHeight: number
    innerWidth: number
}

const Brush: React.FC<BrushProps> = ({xScale, setXScale, innerWidth, innerHeight}) => {

    const brushRef = useRef(null);

    // Инициализация и обновление Brush
    useEffect(() => {
        const brush = d3.brushX()
            .extent([[0, 0], [innerWidth, innerHeight]])
            .on("end", (event) => {
                if (!event.selection) return; // Пропустить, если выборка была очищена
                const [x1, x2] = event.selection;
                const newXScale = xScale.copy()
                    .domain([xScale.invert(x1), xScale.invert(x2)])
                    .range([0, innerWidth]);

                setXScale(() => newXScale);

                d3.select(brushRef.current).call(brush.move, null); // Очистка brush после zoom
            });

        d3.select(brushRef.current)
            .call(brush);

    }, [innerWidth, innerHeight, xScale]);
    return <g ref={brushRef}/>

}
export default LineChart;
