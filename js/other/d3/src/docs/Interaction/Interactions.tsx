import Zoom from "./Zoom.tsx";

function Interactions() {
    return (
        <div>
            <h2>Интерактив</h2>
            <div style={{display: "flex", gap: 20}}>
                <Zoom data={[{x: 0, y: 4}, {x: 0.5, y: 9}, {x: 1, y: 10}]}/>
            </div>
        </div>
    )
}

export default Interactions
