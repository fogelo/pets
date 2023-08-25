import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";

const SettingsBar = () => {
  return (
    <div className="settingbar">
      <label htmlFor="line-width">Толщина линии</label>
      <input
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={10}
        onChange={(e) => toolState.setLineWidth(e.target.value)}
        style={{ marginLeft: 15, padding: "0 0 0 5px" }}
      />
      <label htmlFor="stroke-color" style={{ marginLeft: "20px" }}>
        Цвет обводки
      </label>
      <input
        id="stroke-color"
        type="color"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
        style={{ marginLeft: 15 }}
      />

      <label htmlFor="stroke-color" style={{ marginLeft: "20px" }}>
        Цвет заливки
      </label>
      <input
        id="stroke-color"
        type="color"
        onChange={(e) => toolState.setFillColor(e.target.value)}
        style={{ marginLeft: 15 }}
      />
    </div>
  );
};

export default SettingsBar;
