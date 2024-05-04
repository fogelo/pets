import * as d3 from "d3";
import {useEffect, useRef} from "react";

const margin = {top: 40, right: 40, bottom: 40, left: 40};
const ScaleLinear = ({width = 400, height = 300}) => {
    const baseSvgRef = useRef(null)
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const baseSvg = d3.select(baseSvgRef.current)
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, innerWidth])


    // Значения
    useEffect(() => {
        // можно сопоставлять коротким синтаксисом
        const xScale = d3.scaleLinear([0, 1], [0, innerWidth])
        /*
        * xScale(реальное значение) === координата по x на холсте
        * xScale.invert(координата по x на холсте) == реальное значение
        * */

    }, []);

    // Цвет
    useEffect(() => {
        const xColorScale = d3.scaleLinear([0, 1], ["red", "rgb(0, 0, 255)"])

        /*
        * xColorScale(1) === "blue" (только в rgb(0, 0, 255))
        * */

        /*
        * Доп
        *
        * Можно еще указывать в domain и range больше 2х значений.
        * В отличии от domain элементы в массиве range не обязательно должны быть числами
        * const color = d3.scaleLinear([-1, 0, 1], ["red", "white", "green"]);
        *
        * nice() - расширяет область таким образом, чтобы она начиналась и заканчивалась круглыми значениями
        * const x = d3.scaleLinear([0.241079, 0.969679], [0, 960]).nice();
        * */
    }, [])

    return <div>
        <h3>Линейная шкала</h3>
        <div style={{width: 400, height: 300}}>
            <svg ref={baseSvgRef} width={"100%"} height={"100%"}/>
        </div>
    </div>
}

export default ScaleLinear
