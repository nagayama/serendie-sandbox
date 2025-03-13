import VictoryBarChart from "./VictoryBarChart";
import VictoryPieChart from "./VictoryPieChart";
import VictoryBarLineChart from "./VictoryBarLineChart";

/**
 * Victoryチャートコンポーネント
 *
 * このファイルは、Victoryライブラリを使用した各種チャートコンポーネントをエクスポートします。
 * 以下のコンポーネントが含まれています：
 *
 * - VictoryBarChart: 棒グラフコンポーネント
 * - VictoryPieChart: 円グラフコンポーネント
 * - VictoryBarLineChart: 棒グラフと線グラフを組み合わせたコンポーネント
 */

export { VictoryBarChart, VictoryPieChart, VictoryBarLineChart };

/**
 * VictorySample - すべてのVictoryチャートを表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフ、円グラフ、複合グラフを縦に並べて表示します。
 * すべてのグラフで同じテーマを使用することで、一貫したスタイルを実現しています。
 */
const VictorySample: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <VictoryBarChart />
        <VictoryPieChart />
      </div>
      <VictoryBarLineChart />
    </div>
  );
};

export default VictorySample;
