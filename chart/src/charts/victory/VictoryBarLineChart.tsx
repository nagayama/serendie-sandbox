import React from "react";
import {
  VictoryBar,
  VictoryAxis,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
  VictoryLegend,
} from "victory";
import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import { SerendieChart } from "./components";

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
    { x: 1, y: 120, label: "1月" },
    { x: 2, y: 150, label: "2月" },
    { x: 3, y: 180, label: "3月" },
    { x: 4, y: 135, label: "4月" },
    { x: 5, y: 190, label: "5月" },
    { x: 6, y: 210, label: "6月" },
  ];

  // サンプルデータ - 月次目標データ（数値のxを使用）
  const lineData = [
    { x: 1, y: 130, label: "1月" },
    { x: 2, y: 145, label: "2月" },
    { x: 3, y: 165, label: "3月" },
    { x: 4, y: 175, label: "4月" },
    { x: 5, y: 185, label: "5月" },
    { x: 6, y: 200, label: "6月" },
  ];

  // 平均値の計算
  const averageValue =
    barData.reduce((sum, item) => sum + item.y, 0) / barData.length;

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
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6]}
          tickFormat={["1月", "2月", "3月", "4月", "5月", "6月"]}
          style={{
            axis: { stroke: token("colors.sd.system.color.component.outline") },
            tickLabels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
          }}
        />

        {/* Y軸 */}
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `¥${t}k`}
          style={{
            axis: { stroke: token("colors.sd.system.color.component.outline") },
            tickLabels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
            grid: {
              stroke: token("colors.sd.system.color.component.outline"),
              strokeDasharray: "5,5",
              strokeOpacity: 0.3,
            },
          }}
        />

        {/* 棒グラフ */}
        <VictoryBar
          data={barData}
          x="x"
          y="y"
          style={{
            data: { fill: token("colors.sd.system.color.impression.primary") },
          }}
          barWidth={30}
          alignment="middle"
        />

        {/* 線グラフ */}
        <VictoryLine
          data={lineData}
          x="x"
          y="y"
          style={{
            data: {
              stroke: token("colors.sd.system.color.impression.secondary"),
              strokeWidth: 3,
            },
          }}
        />

        {/* 線グラフのポイント */}
        <VictoryScatter
          data={lineData}
          x="x"
          y="y"
          size={5}
          style={{
            data: {
              fill: token("colors.sd.system.color.impression.secondary"),
              stroke: "white",
              strokeWidth: 2,
            },
          }}
        />

        {/* 平均値の水平線 */}
        <VictoryLine
          style={{
            data: {
              stroke: token("colors.sd.system.color.impression.tertiary"),
              strokeWidth: 2,
              strokeDasharray: "5,5",
            },
          }}
          data={[
            { x: 1, y: averageValue },
            { x: 6, y: averageValue },
          ]}
        />

        {/* 平均値のラベル */}
        <VictoryLabel
          text={`平均: ¥${averageValue.toFixed(1)}k`}
          x={450}
          y={300 - (averageValue / 250) * 200}
          style={{
            fill: token("colors.sd.system.color.impression.tertiary"),
            fontSize: 12,
            fontFamily: token(
              "fonts.sd.reference.typography.fontFamily.primary"
            ),
          }}
        />

        {/* レジェンド */}
        <VictoryLegend
          x={400}
          y={50}
          orientation="vertical"
          gutter={20}
          style={{
            border: { stroke: "none" },
            labels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
          }}
          data={[
            {
              name: "実績",
              symbol: {
                fill: token("colors.sd.system.color.impression.primary"),
              },
            },
            {
              name: "目標",
              symbol: {
                fill: token("colors.sd.system.color.impression.secondary"),
              },
            },
            {
              name: "平均",
              symbol: {
                fill: token("colors.sd.system.color.impression.tertiary"),
                type: "minus",
              },
            },
          ]}
        />
      </SerendieChart>
    </div>
  );
};

export default VictoryBarLineChart;
