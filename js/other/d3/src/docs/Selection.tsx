import {useEffect, useRef} from "react";
import * as d3 from "d3"

const margin = {top: 40, right: 40, bottom: 40, left: 40};

const Selection = ({width = 400, height = 300}) => {
    const baseSvgRef = useRef(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    useEffect(() => {
        const svg = d3
            .select(baseSvgRef.current) // выбираем первый попавшийся элемент из существующих DOM элементов

        svg.append("g") // вставляем внутрь выбранного элемента элемент g и выбираем его
            .append("rect") // вставляем внутрь выбранного элемента элемент rect и выбираем его
            .attr("width", 20) // свойства указываются для выбранного в данный момент элемента (rect)
            .attr("height", 60)
            .on("click", (e) => {
                console.log(e)
                const [x, y] = d3.pointer(e) // вторым параметром можно передать другой target, по умолчанию берется тот на который повешан обработчик, в данном случае это rect
                const points = d3.pointers(e)
                console.log(x, y, points)
            }) // на каждый элемент можно повешать обработчик

        const paths = svg.selectAll("g").select("path") // в каждом выбранном g выберет первый path
        const pathsArr = svg.selectAll("g").selectAll("path"); // в каждом выбранном g выберет все path

        // const even = d3.selectAll("tr").filter(":nth-child(even)") // можно вот так фильтровать
        //d3.selectAll("p").selectChild("b") // the first <b> child of every <p>
    }, [])


    //append и insert
    useEffect(() => {

        // вот так будут заданы все стили для каждого выбранного элемента
        d3.selectAll("p")
            .attr("class", "graf")
            .style("color", "red");

        // добавляет в каждый выбранный div элемент p и выбирает все эти p
        const ps = d3.selectAll("div").append("p")
        // d3.selectAll("div").insert(() => document.createElement("p")) // insert как append, только позволяет вставлять элемент не только в конец
    }, []);


    //join
    useEffect(() => {

        /*
        * join управляет тем, что происходит на 3 стадиях ввод (enter), обновление (update),
        *
        *
        *
        * */

        const svg = d3
            .select(baseSvgRef.current)

        const data = []
        svg.selectAll("circle")
            .data(data)
            .join(
                // Для новых данных, которым не соответствуют элементы, создаются новые элементы circle.
                enter => enter.append("circle"),
                // Существующие элементы, которые привязаны к новым данным, обновляются.
                // В данном случае, специфичных действий для обновления не указано, это означает, что элементы просто остаются на месте.
                update => update,
                // Элементы, для которых в новом массиве данных нет соответствующих объектов, удаляются из DOM.
                exit => exit.remove()
            )
            .attr("fill", "none")
            .attr("stroke", "black");

        svg.selectAll("circle")
            .data(data)
            .join(
                enter => enter.append("circle").attr("fill", "green"),
                update => update.attr("fill", "blue") // Существующие элементы обновляются
            )
            .attr("stroke", "black");

        const matrix = [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ];

        d3.select("body") //выбираем body
            .append("table") // вставляем в конец body table
            .selectAll("tr") // выбираем все еще не существующие tr
            .data(matrix) // связываем каждый элемент tr c элементом массива matrix
            .join("tr") // создаем элемент tr для каждого элемента из matrix
            .selectAll("td") // выбираем все еще не существующие td
            .data(d => d)  // связываем каждый элемент tr c элементом массива d
            .join("td") //  создаем элемент td для каждого элемента из массива d
            .text(d => d) // в каждый td вставляем обычный text

        const div = d3.select("body")
            .selectAll(".div")
            .data([4, 8, 15, 16, 23, 42])
            .enter() // enter() создает временные "плейсхолдеры" для всех элементов массива данных.
            .append("div") // Для каждого "плейсхолдера" создается новый элемент <div>
            .attr("class", ".div")
            .text(d => d);
    }, []);
    return <div style={{display: "flex", gap: 20}}>
        <div>
            <h3>Selection</h3>
            <div style={{width: 400, height: 300}}>
                <svg ref={baseSvgRef} width={"100%"} height={"100%"}>
                    <g>
                        <path></path>
                        <path></path>
                    </g>
                    <g>
                        <path></path>
                        <path></path>
                    </g>
                    <g>
                        <path></path>
                        <path></path>
                    </g>
                </svg>

            </div>
        </div>
    </div>
}

export default Selection
