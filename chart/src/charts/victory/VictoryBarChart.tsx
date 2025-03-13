import React from "react";
import { VictoryBar, VictoryAxis, VictoryGroup, VictoryLegend } from "victory";
import { css } from "@serendie/ui/css";
import { SerendieChart } from "./components";

/**
 * VictoryBarChart - Victoryを使用した棒グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. SerendieChartをコンテナとして使用
 * 2. VictoryAxisでx軸とy軸を設定
 * 3. VictoryGroupで複数の棒グラフをグループ化
 * 4. VictoryBarで各データセットを棒グラフとして表示
 * 5. VictoryLegendで凡例を表示
 *
 * Victoryの特徴として、各コンポーネントを組み合わせることで
 * 複雑なチャートを構築できます。また、テーマを適用することで
 * 一貫したスタイルを実現しています。
 */
export const VictoryBarChart: React.FC = () => {
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
      {/* SerendieChart: SerendieThemeを適用したチャートコンテナ */}
      <SerendieChart
        domainPadding={{ x: 50 }} // バーの端がチャートの端に接触しないようにパディングを設定
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
        <VictoryGroup offset={25}>
          {/* VictoryBar: 製品Aの棒グラフ */}
          <VictoryBar
            data={productAData}
            barWidth={20} // 棒の幅を指定
            animate={{
              duration: 2000, // アニメーションの時間（ミリ秒）
              onLoad: { duration: 1000 }, // 初期ロード時のアニメーション
            }}
          />
          {/* VictoryBar: 製品Bの棒グラフ */}
          <VictoryBar
            data={productBData}
            barWidth={20} // 棒の幅を指定
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </VictoryGroup>
      </SerendieChart>
    </div>
  );
};

export default VictoryBarChart;
