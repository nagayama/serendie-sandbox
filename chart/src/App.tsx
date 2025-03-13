import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import VictorySample from "./charts/victory";

function App() {
  return (
    <div
      className={css({
        padding: token("spacing.sd.system.dimension.spacing.large"),
        minHeight: "100vh",
        backgroundColor: token("colors.sd.system.color.component.surface"),
      })}
    >
      <h1
        className={css({
          marginBottom: token("spacing.sd.system.dimension.spacing.large"),
          textAlign: "center",
          color: token("colors.sd.system.color.component.onSurface"),
        })}
      >
        Victoryチャートライブラリ
      </h1>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: token("spacing.sd.system.dimension.spacing.extraLarge"),
        })}
      >
        <VictorySample />
      </div>
    </div>
  );
}

export default App;
