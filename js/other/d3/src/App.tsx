import "./App.css"
import LineChart from "./components/arch/SimpleLineChart2/LineChart.tsx";
import D3LineChart from "./components/D3SimpleLineChart.tsx";
import {useEffect, useState} from "react";
import {signalData} from "../data.ts";
import D3RealTimeLineChart from "./components/D3RealTimeLineChart.tsx";
import D3DraggableLineChart from "./components/D3DraggableLineChart.tsx";
import D3GradientLineChart from "./components/D3GradientLineChart.tsx";
import {ArrayData, Axes, Interactions, ScaleLinear, Selection} from "./docs";
import Scales from "./docs/Scales/Scales.tsx";
import D3ZoomableLineChart from "./components/zoom/D3ZoomableLineChart.tsx";
import ReactZoomableLineChart from "./components/zoom/ReactZoomableLineChart.tsx";
import ZoomableLineCharts from "./components/zoom/ZoomableLineCharts.tsx";
import Animation from "./components/Animation.tsx";
import BrushLineCharts from "./components/brush/BrushLineCharts.tsx";
import OtherLineCharts from "./components/other/OtherLineCharts.tsx";


const staticData = [...signalData.values.map((value, i) => ({y: value, x: signalData.times[i]}))]

function App() {
    const [data, setData] = useState(staticData)
    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         const i = data.length
    //         const nextX = signalData.times[i]
    //         const nextY = signalData.values[i]
    //         setData(() => [...data, {x: nextX, y: nextY}])
    //     }, 1000)
    //     return () => clearTimeout(timeoutId)
    // }, [data]);


    return (
        <>
            {/*<LineChart data={data} width={800} height={500}/>*/}
            {/*<D3LineChart data={data}/>*/}
            {/*<D3RealTimeLineChart data={data}/>*/}
            {/*<D3DraggableLineChart data={data}/>*/}
            {/*<D3GradientLineChart/>*/}
            {/*<svg>*/}
            {/*    <line x1="0" y1="20" x2="200" y2="20" stroke="black" strokeDasharray="200 200" strokeDashoffset="200"/>*/}
            {/*    <line x1="0" y1="40" x2="200" y2="40" stroke="black"/>*/}
            {/*</svg>*/}


            <Animation/>
            <ZoomableLineCharts/>
            <BrushLineCharts/>

            <OtherLineCharts/>

            <Axes/>
            <Scales/>
            {/*<Selection/>*/}
            <ArrayData/>
            {/*<Interactions/>*/}
        </>
    )
}

export default App
