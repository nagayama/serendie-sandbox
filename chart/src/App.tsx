import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import VisxSample from "./VisxSample";
import VictorySample from "./VictorySample";
import ReChartSample from "./ReChartSample";

function App() {
  return (
    <div
      className={css({
        padding: token("spacing.sd.system.dimension.spacing.large"),
        minHeight: "100vh",
      })}
    >
      <h1
        className={css({
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
          gap:
            token("spacing.sd.system.dimension.spacing.extraLarge") +
            " " +
            token("spacing.sd.system.dimension.spacing.extraLarge"),
        })}
      >
        <section>
          <h2
            className={css({
              color: token("colors.sd.system.color.component.onSurface"),
              marginBottom: token("spacing.sd.system.dimension.spacing.medium"),
              textAlign: "center",
            })}
          >
            Visx
          </h2>
          <VisxSample />
        </section>

        <section>
          <h2
            className={css({
              color: token("colors.sd.system.color.component.onSurface"),
              marginBottom: token("spacing.sd.system.dimension.spacing.medium"),
              textAlign: "center",
            })}
          >
            Victory
          </h2>
          <VictorySample />
        </section>

        <section>
          <h2
            className={css({
              color: token("colors.sd.system.color.component.onSurface"),
              marginBottom: token("spacing.sd.system.dimension.spacing.medium"),
              textAlign: "center",
            })}
          >
            Recharts
          </h2>
          <ReChartSample />
        </section>
      </div>
    </div>
  );
}

export default App;
