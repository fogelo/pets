import * as d3 from "d3";
import {useEffect, useRef} from "react";

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const ScaleOrdinal
    = ({width = 400, height = 300}) => {
    const baseSvgRef = useRef(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom


    // Значения
    useEffect(() => {
        const baseSvg = d3.select(baseSvgRef.current)

        const countries = ["USA", "Canada", "Mexico", "China", "Japan", "Russia"];
        const colors = ["blue", "red", "green", "black", "orange", "purple"];

        // Создание ординальной шкалы
        const colorScale = d3.scaleOrdinal()
            .domain(countries)
            .range(colors);


        // Добавление группы для каждого элемента
        const groups = baseSvg.selectAll(".country-group")
            .data(countries)
            .join("g")
            .attr("class", "country-group")
            .attr("transform", (d, i) => `translate(${i * 60}, 30)`)
            .call(d => {
                //console.log(d)
            })

        // Добавление прямоугольников в каждую группу
        groups.append("rect")
            .attr("width", 50)
            .attr("height", 50)
            .attr("fill", d => colorScale(d))
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        // Добавление текста в каждую группу
        groups.append("text")
            .attr("x", 25)  // Центрирование текста по середине прямоугольника
            .attr("y", 65)  // Позиционирование текста ниже прямоугольника
            .attr("text-anchor", "middle")
            .text(d => d);
    }, []);

    // Цвет
    useEffect(() => {

    }, [])

    return <div style={{display: "flex", gap: 20}}>
        <div>
            <h3>Ординальная шкала)</h3>
            <div style={{width: 400, height: 300}}>
                <svg ref={baseSvgRef} width={"100%"} height={"100%"}/>
            </div>
        </div>
    </div>
}

export default ScaleOrdinal

