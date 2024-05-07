import {signalData} from "../../../data.ts";
import SegmentsLineChart from "./SegmentsLineChart.tsx";

const staticData = [...signalData.values.map((value, i) => ({y: value, x: signalData.times[i]}))]

const segmentsData = [staticData.slice(0, 50), staticData.slice(49)]
const OtherLineCharts = () => {
    return <div>
        <h2>Other</h2>
        <div style={{display: "flex", flexDirection: "column"}}>
            <SegmentsLineChart data={segmentsData}/>
        </div>
    </div>
}

export default OtherLineCharts
