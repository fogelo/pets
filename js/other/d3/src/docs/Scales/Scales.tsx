import ScaleOrdinal from "./ScaleOrdinal.tsx";
import ScaleLinear from "./ScaleLinear.tsx";
import ScaleBand from "./ScaleBand.tsx";

function Scales() {

    return (
        <div>
            <h2>Шкалы</h2>
            <div style={{display: "flex", gap: 20}}>
                <ScaleLinear/>
                <ScaleOrdinal/>
                <ScaleBand/>
            </div>
        </div>
    )
}

export default Scales
