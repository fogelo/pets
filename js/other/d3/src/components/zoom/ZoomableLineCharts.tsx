import D3ZoomableLineChart from "./D3ZoomableLineChart.tsx";
import {signalData} from "../../../data.ts";
import ReactZoomableLineChart from "./ReactZoomableLineChart.tsx";

const staticData = [...signalData.values.map((value, i) => ({y: value, x: signalData.times[i]}))]

const ZoomableLineCharts = () => {
    return <div>
        <h2>Zoom</h2>
        <div style={{display: "flex"}}>
            <D3ZoomableLineChart data={staticData}/>
            <ReactZoomableLineChart data={staticData}/>
        </div>
    </div>
}

export default ZoomableLineCharts
