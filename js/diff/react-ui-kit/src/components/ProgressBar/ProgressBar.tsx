import "./ProgressBar.css"; // Путь к вашему CSS файлу

const ProgressBar = ({ progress }) => {
  const progressWidth = `${progress}%`;

  return (
    <div className="wrapper">
      <div
        className="progress"
        style={{
          width: progressWidth,
        }}
      ></div>
      <div className="back"></div>
      <div className="stripes"></div>
    </div>
  );
};

export default ProgressBar;
