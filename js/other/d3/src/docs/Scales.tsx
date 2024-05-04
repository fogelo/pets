import * as d3 from "d3";
import {useRef} from "react";

const Scales = () => {
    const baseSvgRef = useRef(null)
    const baseSvg = d3.select(baseSvgRef.current)

    return <div style={{display: "flex", gap: 20}}>
        <div style={{width: 400, height: 300}}>
            <h2>Оси</h2>
            <svg ref={baseSvgRef} width={"100%"} height={"100%"}/>
        </div>

    </div>
}

export default Scales
