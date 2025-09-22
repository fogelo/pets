import { ThemeProvider } from "../context/ThemeContext";
import ThemedComponent from "../hooks/UseContext";

const ReactHooks: React.FC = () => {
  return (
    <ThemeProvider>
      <div>
        {/* <UseState /> */}
        {/* <UseEffect /> */}
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
};

export default ReactHooks;
