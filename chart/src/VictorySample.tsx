import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryPie,
  VictoryContainer,
} from "victory";
import { css } from "@serendie/ui/css";
import SerendieTheme from "./VictoryTheme";

const animationDuration = 200;

/**
 * VictorySample.tsx
 *
 * このファイルはVictoryライブラリを使用したチャートの実装例を提供します。
 * Victoryは高レベルなチャートコンポーネントを提供するライブラリで、
 * 宣言的なAPIを通じて複雑なチャートを簡単に作成できます。
 *
 * 主な特徴:
 * - 宣言的API: 複雑な設定を簡潔に記述できる
 * - テーマ機能: 組み込みのテーマシステムでスタイルを一元管理
 * - アニメーション: 簡単にアニメーションを追加できる
 *
 * このファイルでは以下のコンポーネントを実装しています:
 * 1. VictoryBarChart - 棒グラフコンポーネント
 * 2. VictoryPieChart - 円グラフコンポーネント
 * 3. VictorySample - 両方のグラフを表示するメインコンポーネント
 *
 * また、カスタムテーマ（SerendieTheme）を使用して、スタイルを一元管理しています。
 */

// サンプルデータ
// 四半期ごとの製品A、製品Bの売上データ
const data = [
  {
    quarter: "Q1",
    productA: 10000,
    productB: 8000,
  },
  {
    quarter: "Q2",
    productA: 15000,
    productB: 12000,
  },
  {
    quarter: "Q3",
    productA: 12000,
    productB: 14000,
  },
  {
    quarter: "Q4",
    productA: 18000,
    productB: 16000,
  },
];

// Victoryのデータ形式に変換
// Victoryは { x, y } 形式のデータを期待するため、変換が必要
const productAData = data.map((d, i) => ({ x: i + 1, y: d.productA }));
const productBData = data.map((d, i) => ({ x: i + 1, y: d.productB }));

// 円グラフ用データ
// 製品A、製品Bの総売上を計算し、Victoryの形式に変換
const pieData = [
  { x: "製品A", y: data.reduce((sum, d) => sum + d.productA, 0) },
  { x: "製品B", y: data.reduce((sum, d) => sum + d.productB, 0) },
];

/**
 * VictoryBarChart - Victoryを使用した棒グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. VictoryChartをコンテナとして使用
 * 2. VictoryAxisでx軸とy軸を設定
 * 3. VictoryGroupで複数の棒グラフをグループ化
 * 4. VictoryBarで各データセットを棒グラフとして表示
 * 5. VictoryLegendで凡例を表示
 *
 * Victoryの特徴として、各コンポーネントを組み合わせることで
 * 複雑なチャートを構築できます。また、テーマを適用することで
 * 一貫したスタイルを実現しています。
 */
export const VictoryBarChart = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "sd.system.dimension.spacing.large",
        backgroundColor: "sd.system.color.component.surface",
        borderRadius: "sd.system.dimension.radius.medium",
        boxShadow: "sd.system.elevation.shadow.level1",
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: "sd.system.color.impression.primary",
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Victory棒グラフサンプル
      </h2>
      {/* VictoryChart: チャート全体のコンテナ */}
      <VictoryChart
        domainPadding={40} // バーの端がチャートの端に接触しないようにパディングを設定
        theme={SerendieTheme} // カスタムテーマを適用
        width={500}
        height={300}
      >
        {/* VictoryLegend: 凡例を表示 */}
        <VictoryLegend
          x={125} // 凡例のx座標
          y={10} // 凡例のy座標
          orientation="horizontal" // 凡例の方向
          gutter={20} // 凡例アイテム間の間隔
          data={[{ name: "製品A" }, { name: "製品B" }]} // 凡例のデータ
          // 注: 色はテーマから自動的に適用される
        />
        {/* VictoryAxis: x軸を設定 */}
        <VictoryAxis
          tickValues={[1, 2, 3, 4]} // 目盛りの値
          tickFormat={["Q1", "Q2", "Q3", "Q4"]} // 目盛りのラベル
          // 注: 軸のスタイルはテーマから自動的に適用される
        />
        {/* VictoryAxis: y軸を設定（dependentAxis=trueでy軸になる） */}
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `¥${x / 1000}k`} // 金額表示のフォーマット（千円単位）
        />
        {/* VictoryGroup: 複数の棒グラフをグループ化 */}
        <VictoryGroup offset={30}>
          {/* offset: グループ内の棒の間隔 */}
          {/* VictoryBar: 製品Aの棒グラフ */}
          <VictoryBar
            data={productAData}
            animate={{
              // アニメーション設定
              duration: animationDuration, // アニメーションの時間（ミリ秒）
              onLoad: { duration: animationDuration }, // 初期ロード時のアニメーション
            }}
            // 注: 色はテーマから自動的に適用される
          />
          {/* VictoryBar: 製品Bの棒グラフ */}
          <VictoryBar
            data={productBData}
            animate={{
              duration: animationDuration,
              onLoad: { duration: animationDuration },
            }}
            // 注: 色はテーマから自動的に適用される（2番目の色）
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

/**
 * VictoryPieChart - Victoryを使用した円グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. VictoryPieで円グラフを表示
 * 2. アニメーションとラベルを設定
 * 3. 凡例を表示
 *
 * Victoryの円グラフは、単一のVictoryPieコンポーネントで
 * 完結するシンプルな実装が可能です。テーマを適用することで
 * 棒グラフと一貫したスタイルを実現しています。
 */
export const VictoryPieChart = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "sd.system.dimension.spacing.large",
        backgroundColor: "sd.system.color.component.surface",
        borderRadius: "sd.system.dimension.radius.medium",
        boxShadow: "sd.system.elevation.shadow.level1",
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: "sd.system.color.impression.primary",
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Victory円グラフサンプル
      </h2>
      {/* VictoryPie: 円グラフを表示 */}
      <VictoryPie
        data={pieData}
        width={400}
        height={400}
        theme={SerendieTheme} // カスタムテーマを適用
        innerRadius={70} // 内側の半径（ドーナツ形状）
        labelRadius={({ innerRadius }) => (innerRadius as number) + 30} // ラベルの配置半径
        animate={{
          // アニメーション設定
          duration: animationDuration,
          onLoad: { duration: animationDuration },
        }}
        labels={({ datum }) => `${datum.x}: ¥${datum.y / 1000}k`} // ラベルのフォーマット
        containerComponent={
          <VictoryContainer
            style={{
              touchAction: "auto", // タッチデバイスでの操作を改善
            }}
          />
        }
        // 注: 色はテーマから自動的に適用される
      />
      {/* 凡例: 製品と色の対応を表示 */}
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          marginTop: "sd.system.dimension.spacing.medium",
        })}
      >
        {pieData.map((d, i) => (
          <div
            key={d.x}
            className={css({
              display: "flex",
              alignItems: "center",
              marginRight: "sd.system.dimension.spacing.medium",
            })}
          >
            <div
              className={css({
                width: "12px",
                height: "12px",
                marginRight: "6px",
                backgroundColor:
                  i === 0
                    ? "sd.system.color.impression.primary"
                    : "sd.system.color.impression.secondary",
                borderRadius: "sd.system.dimension.radius.extraSmall",
              })}
            />
            <span>
              {d.x}: ¥{(d.y / 1000).toLocaleString()}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * VictorySample - 棒グラフと円グラフの両方を表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフと円グラフの両方を縦に並べて表示します。
 * 両方のグラフで同じテーマ（SerendieTheme）を使用することで、
 * 一貫したスタイルを実現しています。
 *
 * 使用例:
 * ```tsx
 * <VictorySample />
 * ```
 *
 * テーマはコンポーネント内で個別に適用されているため、
 * このコンポーネントレベルでテーマを変更する必要はありません。
 */
const VictorySample = () => {
  return (
    <div
      className={css({
        display: "flex",
        gap: "sd.system.dimension.spacing.extraLarge",
      })}
    >
      <VictoryBarChart />
      <VictoryPieChart />
    </div>
  );
};

export default VictorySample;
