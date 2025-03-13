import React from "react";
import { VictoryBar, VictoryAxis, VictoryLine, VictoryLegend } from "victory";
import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import { SerendieChart } from "./components";
import SerendieTheme from "../../VictoryTheme";

/**
 * VictoryBarLineChart - 棒グラフと線グラフを組み合わせたコンポーネント
 *
 * このコンポーネントは以下の機能を提供します：
 * - 棒グラフによる月次データの表示
 * - 線グラフによるトレンドの表示
 * - 平均値を示す水平線の表示
 * - レジェンド（凡例）の表示
 *
 * 複合チャートの例として、実際の売上データと目標値の比較、
 * および平均値との関係を視覚的に表現しています。
 *
 * SerendieChartを使用することで、SerendieThemeが自動的に適用されます。
 */
export const VictoryBarLineChart: React.FC = () => {
  // サンプルデータ - 月次売上データ（数値のxを使用）
  const barData = [
    { x: 1, y: 120 },
    { x: 2, y: 150 },
    { x: 3, y: 180 },
    { x: 4, y: 135 },
    { x: 5, y: 190 },
    { x: 6, y: 210 },
    { x: 7, y: 220 },
    { x: 8, y: 230 },
    { x: 9, y: 240 },
    { x: 10, y: 250 },
    { x: 11, y: 260 },
    { x: 12, y: 270 },
  ];

  // サンプルデータ - 月次目標データ（数値のxを使用）
  const lineData = [
    { x: 1, y: 130 },
    { x: 2, y: 145 },
    { x: 3, y: 165 },
    { x: 4, y: 175 },
    { x: 5, y: 185 },
    { x: 6, y: 200 },
    { x: 7, y: 220 },
    { x: 8, y: 230 },
    { x: 9, y: 240 },
    { x: 10, y: 250 },
    { x: 11, y: 260 },
    { x: 12, y: 270 },
  ];

  // 平均値の計算
  const averageValue =
    barData.reduce((sum, item) => sum + item.y, 0) / barData.length;

  // X軸のラベル（月表示）
  const monthLabels = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  // テーマから色を取得
  const primaryColor =
    SerendieTheme.group?.colorScale?.[0] ||
    token("colors.sd.system.color.impression.primary");
  const secondaryColor =
    SerendieTheme.group?.colorScale?.[1] ||
    token("colors.sd.system.color.impression.secondary");
  const tertiaryColor = "red";

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
        棒グラフと線グラフの組み合わせ
      </h2>

      {/* SerendieChart: SerendieThemeを適用したチャートコンテナ */}
      <SerendieChart
        domainPadding={{ x: 25 }}
        padding={{ top: 50, bottom: 50, left: 60, right: 100 }}
        width={500}
        height={300}
      >
        {/* X軸 */}
        <VictoryAxis tickFormat={monthLabels} />

        {/* Y軸 */}
        <VictoryAxis dependentAxis tickFormat={(t) => `¥${t}k`} />

        {/* 棒グラフ */}
        <VictoryBar data={barData} />

        {/* 線グラフ */}
        <VictoryLine
          data={lineData.slice(0, 6)}
          style={{
            data: {
              stroke: secondaryColor,
              strokeWidth: 5,
            },
          }}
        />

        {/* 線グラフ */}
        <VictoryLine
          data={lineData.slice(5, 12)}
          style={{
            data: {
              stroke: tertiaryColor,
              strokeWidth: 3,
              strokeDasharray: "2,2",
            },
          }}
        />

        {/* 平均値の水平線 */}
        <VictoryLine
          style={{
            data: {
              stroke: tertiaryColor,
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
          }}
          data={[
            { x: 1, y: averageValue },
            { x: 12, y: averageValue },
          ]}
        />
        {/* レジェンド */}
        <VictoryLegend
          x={400}
          y={50}
          orientation="vertical"
          gutter={20}
          data={[
            {
              name: "実績",
              symbol: { fill: primaryColor },
            },
            {
              name: "目標",
              symbol: { fill: secondaryColor },
            },
            {
              name: "平均",
              symbol: { fill: tertiaryColor, type: "minus" },
            },
          ]}
        />
      </SerendieChart>
    </div>
  );
};

export default VictoryBarLineChart;
