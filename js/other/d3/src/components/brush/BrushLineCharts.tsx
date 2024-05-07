import D3BrushLineChart from "./D3BrushLineChart.tsx";
import {signalData} from "../../../data.ts";
import ReactZoomableLineChart from "./ReactZoomableLineChart.tsx";

const staticData = [...signalData.values.map((value, i) => ({y: value, x: signalData.times[i]}))]

const BrushLineCharts = () => {
    return <div>
        <h2>Brush</h2>
        <div style={{display: "flex", flexDirection: "column"}}>
            <D3BrushLineChart data={staticData}/>
        </div>
    </div>
}

export default BrushLineCharts
