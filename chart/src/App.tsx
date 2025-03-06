import { css } from "@serendie/ui/css";
import VisxSample from "./VisxSample";
import VictorySample from "./VictorySample";

function App() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "sd.system.dimension.spacing.large",
        backgroundColor: "sd.system.color.component.surface",
        minHeight: "100vh",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "sd.system.dimension.spacing.extraLarge",
          width: "100%",
          maxWidth: "1200px",
        })}
      >
        <VisxSample />
        <VictorySample />
      </div>
    </div>
  );
}

export default App;
