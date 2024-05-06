import {useEffect, useRef} from "react";
import * as d3 from "d3"

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const Axes = ({width = 400, height = 300}) => {

    const baseSvgRef = useRef(null)
    const ticksSvgRef = useRef(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom


    const xScale = d3.scaleLinear().domain([0, 1]).range([0, innerWidth])
    const yScale = d3.scaleLinear().domain([0, 1]).range([innerHeight, 0])


    // БАЗА
    useEffect(() => {
        const baseSvg = d3.select(baseSvgRef.current)
        const xAxisBottom = d3.axisBottom(xScale)
        const xAxisTop = d3.axisTop(xScale)

        const yAxisLeft = d3.axisLeft(yScale)
        const yAxisRight = d3.axisRight(yScale)

        baseSvg.append("g").call(xAxisBottom).attr("transform", `translate(${margin.left},${innerHeight + margin.top})`)
        baseSvg.append("g").call(xAxisTop).attr("transform", `translate(${margin.left},${margin.top})`)

        baseSvg.append("g").call(yAxisLeft).attr("transform", `translate(${margin.left},${margin.top})`)
        baseSvg.append("g").call(yAxisRight).attr("transform", `translate(${margin.left + innerWidth},${margin.top})`)
    }, [innerHeight, innerWidth, xScale, yScale]);


    // Тики
    useEffect(() => {
        const ticksSvg = d3.select(ticksSvgRef.current)
        const xAxisBottom = d3.axisBottom(xScale)
            .ticks(5) // устанавливаем примерно 5 меток на оси
            .tickFormat(d => `${d}$`) // форматирует значения рядом с метками

        const yAxisLeft = d3.axisLeft(yScale)
            .tickValues([0, 0.2, 0.7, 1]) // явно задает значения, на которых будут метки

        const yAxisRight = d3.axisRight(yScale)
            .tickArguments([6, "s"]) // походу тоже самое что и ticks только принимает массив
            .tickSize(10) // задает размер тика всех тиков
            // .tickSizeInner(20) // задает размер внутренних тиков (кроме первого и последнего)
            // .tickSizeOuter(20) // задает размер внешних тиков (первого и последнего)
            .tickPadding(10) // задает отступ значения от тика
        //.offset(-10) // задает отступ для всей шкалы (как по горизонтали, так и по вертикали)


        /*
        * Доп
        * можно есть форматы для значений, как их отображать если они очень маленькие или очень большие могут быть
        * axis.tickFormat(d3.format(",.0f"));
        * axis.ticks(10, ",f");
        *
        *
        *
        * */

        // console.log(d3.tickStep(1, 9, 5)) // возвращает какой шаг будет между тиками
        // console.log(d3.range(4)) // возвращает массив [0,1,2,3], можно еще и так использовать range(start, stop, step)


        ticksSvg.append("g").call(xAxisBottom).attr("transform", `translate(${margin.left},${innerHeight + margin.top})`)

        ticksSvg.append("g").call(yAxisLeft).attr("transform", `translate(${margin.left},${margin.top})`)
        ticksSvg.append("g").call(yAxisRight).attr("transform", `translate(${margin.left + innerWidth},${margin.top})`)
    }, [innerHeight, innerWidth, xScale, yScale]);

    // Как настроить тики без использования методов типа axisBottom?
    useEffect(() => {

    }, []);
    return <div style={{display: "flex", gap: 20}}>
        <div>
            <h2>Оси</h2>
            <div style={{width: 400, height: 300}}>
                <svg ref={baseSvgRef} width={"100%"} height={"100%"}/>
            </div>
        </div>
        <div>
            <h2>Тики</h2>
            <div style={{width: 400, height: 300}}>
                <svg ref={ticksSvgRef} width={"100%"} height={"100%"}/>
            </div>
        </div>
    </div>
}

export default Axes
