import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import VisxSample from "./VisxSample";
import VictorySample from "./VictorySample";

function App() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: token("spacing.sd.system.dimension.spacing.large"),
        backgroundColor: token("colors.sd.system.color.component.surface"),
        minHeight: "100vh",
      })}
    >
      <h1
        className={css({
          color: token("colors.sd.system.color.impression.primary"),
          marginBottom: token("spacing.sd.system.dimension.spacing.large"),
          textAlign: "center",
        })}
      >
        チャートライブラリ比較
      </h1>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: token("spacing.sd.system.dimension.spacing.extraLarge"),
          width: "100%",
          maxWidth: "1200px",
        })}
      >
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: token("spacing.sd.system.dimension.spacing.medium"),
          })}
        >
          <h2
            className={css({
              color: token("colors.sd.system.color.impression.secondary"),
              textAlign: "center",
            })}
          >
            棒グラフと円グラフの実装例
          </h2>
          <p
            className={css({
              textAlign: "center",
              marginBottom: token("spacing.sd.system.dimension.spacing.large"),
            })}
          >
            visxとVictoryを使用した実装の比較
          </p>
        </div>
        <VisxSample />
        <VictorySample />
      </div>
    </div>
  );
}

export default App;
