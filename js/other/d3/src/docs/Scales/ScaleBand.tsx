import * as d3 from "d3";
import {useEffect, useRef} from "react";

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const ScaleBand
    = ({width = 400, height = 300}) => {
    const baseSvgRef = useRef(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // Значения
    useEffect(() => {
        const baseSvg = d3.select(baseSvgRef.current)

        const data = [
            {product: "Apples", sales: 120},
            {product: "Oranges", sales: 200},
            {product: "Bananas", sales: 150},
            {product: "Grapes", sales: 90},
            {product: "Pears", sales: 100}
        ];

        // Создание шкалы для X
        const x = d3.scaleBand()
            .domain(data.map(d => d.product))
            .rangeRound([0, width])
            .padding(0.1);

        // Создание шкалы для Y
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.sales)])
            .range([height, 0]);

        const g = baseSvg.append("g")

        // Создание баров
        g.selectAll(".bar")
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.product))
            .attr("y", d => y(d.sales))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.sales))
            .attr("fill", "steelblue");
    }, []);

    // Цвет
    useEffect(() => {

    }, [])

    return <div style={{display: "flex", gap: 20}}>
        <div>
            <h3>scaleBand</h3>
            <div style={{width: 400, height: 300}}>
                <svg ref={baseSvgRef} width={"100%"} height={"100%"}/>
            </div>
        </div>
    </div>
}

export default ScaleBand

