import React, {useRef, useEffect, useState, useCallback} from "react";
import * as d3 from "d3";

interface LineChartProps {
    data: { x: number; y: number }[];
    width: number;
    height: number;
}

const margin = {top: 20, right: 30, bottom: 40, left: 50};

const ReactZoomableLineChart: React.FC<LineChartProps> = ({data, width = 800, height = 300}) => {
    const ref = useRef<SVGSVGElement>(null);
    const [transform, setTransform] = useState(d3.zoomIdentity);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x) as [number, number])
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y) as [number, number])
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
            });
        svg.call(zoom)


        //Доп
        svg.on("click", (event) => {


            //svg.transition()
                //.duration(750)
                //.call(zoom.transform, d3.zoomIdentity) //возвращает в исходное положение с плавным переходом, zoomIdentity - это event.transform
            //.call(zoom.translateBy, 100, 50) перемещает согласно zoom.translateBy(selection, x, y)
            //.call(zoom.translateTo, dataX, dataY, [centerX, centerY]) // Фокусировка на конкретной точке данных, точка данных (dataX, dataY) оказалась в заданном центре [centerX, centerY] за 750 миллисекунд.
            //.call(zoom.scaleTo, 2); // устанавливает масштаб в 2 раза больше


            // Способы как можно создать объект transform
            // console.log(d3.zoomIdentity.translate(0, 0).scale(3))
            // console.log(new d3.ZoomTransform(3, 0, 0))

        })
    }, []);

    const transformedLine = d3.line<{ x: number; y: number }>()
        .x(d => transform.rescaleX(xScale)(d.x))
        .y(d => transform.rescaleY(yScale)(d.y));

    return (
        <div style={{width, height}}>
            <svg ref={ref} width="100%" height="100%">
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <path d={transformedLine(data)} fill="none" stroke="blue" strokeWidth="2"/>
                    <g transform={`translate(${0},${innerHeight})`}>
                        <line x2={innerWidth} stroke={"black"}/>
                        {/*{transform.rescaleX(xScale).ticks().map(tick=>)}*/}

                        //TODO добавить тики и попробовать сделать zoomIdentity через react с анимацией
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default ReactZoomableLineChart;
