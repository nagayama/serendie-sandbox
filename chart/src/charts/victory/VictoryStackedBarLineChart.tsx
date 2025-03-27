import React from "react";
import {
  VictoryBar,
  VictoryAxis,
  VictoryLine,
  VictoryLegend,
  VictoryStack,
  VictoryScatter,
  VictoryTooltip,
} from "victory";
import { css } from "@serendie/ui/css";
import { SerendieChart } from "./components";
import { token } from "@serendie/ui/tokens";

/**
 * VictoryStackedBarLineChart - スタック棒グラフと線グラフを組み合わせた複雑なコンポーネント
 *
 * このコンポーネントは以下の機能を提供します：
 * - スタック棒グラフによる複数要素の積み上げ表示
 * - 線グラフによる効率指標の表示
 * - 左右のY軸（パーセント表示と効率値）
 * - レジェンド（凡例）の表示
 *
 * 製造ラインの稼働状況と効率を視覚的に表現する複合チャートです。
 * 左側のY軸はパーセント表示（0-100%）、右側のY軸は効率値（0-10）を示します。
 */
export const VictoryStackedBarLineChart: React.FC = () => {
  // 日付の配列（X軸）
  const dates = [
    "10/28",
    "10/29",
    "10/30",
    "10/31",
    "11/01",
    "11/02",
    "11/03",
    "11/04",
    "11/05",
    "11/06",
    "11/07",
    "11/08",
    "11/09",
    "11/10",
    "11/11",
    "11/12",
    "11/13",
    "11/14",
    "11/15",
    "11/16",
    "11/17",
    "11/18",
    "11/19",
    "11/20",
    "11/21",
    "11/22",
  ];

  // スタック棒グラフのデータ（各要素の積み上げ）
  // 故障データ
  const failureData = dates.map((date, i) => ({
    x: i + 1,
    y: 5 + Math.random() * 15,
    label: `${5 + Math.random() * 15}%`,
  }));

  // 段取り・調整データ
  const setupData = dates.map((date, i) => ({
    x: i + 1,
    y: 10 + Math.random() * 10,
    label: `${10 + Math.random() * 10}%`,
  }));

  // 立ち上がりデータ
  const startupData = dates.map((date, i) => ({
    x: i + 1,
    y: 5 + Math.random() * 5,
    label: `${5 + Math.random() * 5}%`,
  }));

  // 速度低下データ
  const speedReductionData = dates.map((date, i) => ({
    x: i + 1,
    y: 15 + Math.random() * 10,
    label: `${15 + Math.random() * 10}%`,
  }));

  // 不良手直しデータ
  const reworkData = dates.map((date, i) => ({
    x: i + 1,
    y: 10 + Math.random() * 15,
    label: `${10 + Math.random() * 15}%`,
  }));

  // その他停止データ
  const otherStopData = dates.map((date, i) => ({
    x: i + 1,
    y: 5 + Math.random() * 15,
    label: `${5 + Math.random() * 15}%`,
  }));

  // 設備総合効率（OEE）データ - 線グラフ用
  const oeeData = dates.map((date, i) => {
    // 基本的な効率値（6〜8の範囲）
    let efficiency = 6.5 + Math.random() * 1.5;

    // 特定の日に効率のピークを作る
    if (i === 2 || i === 5 || i === 8 || i === 11) {
      efficiency = 7.5 + Math.random() * 0.5;
    }

    return {
      x: i + 1,
      y: efficiency,
    };
  });

  // 線グラフの色
  const lineColor = token("colors.sd.system.color.impression.primary");

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
        maxWidth: "800px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: "sd.system.color.impression.primary",
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        設備稼働状況と総合効率（OEE）
      </h2>

      {/* SerendieChart: SerendieThemeを適用したチャートコンテナ */}
      <SerendieChart
        domainPadding={{ x: 15 }}
        padding={{ top: 50, bottom: 80, left: 60, right: 60 }}
        width={750}
        height={300}
      >
        {/* X軸 - 日付 */}
        <VictoryAxis
          tickValues={dates.map((_, i) => i + 1)}
          tickFormat={dates}
          style={{
            tickLabels: {
              angle: -45,
              textAnchor: "end",
            },
          }}
        />

        {/* 左Y軸 - パーセント表示 (0-100%) */}
        <VictoryAxis
          dependentAxis
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          tickFormat={(t) => `${t}%`}
        />

        {/* スタック棒グラフ */}
        <VictoryStack>
          {/* 故障 */}
          <VictoryBar
            data={failureData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: {
                stroke: "white",
                strokeWidth: 1,
              },
            }}
          />
          {/* 段取り・調整 */}
          <VictoryBar
            data={setupData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: { stroke: "white", strokeWidth: 2 },
            }}
          />
          {/* 立ち上がり */}
          <VictoryBar
            data={startupData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: { stroke: "white", strokeWidth: 2 },
            }}
          />
          {/* 速度低下 */}
          <VictoryBar
            data={speedReductionData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: { stroke: "white", strokeWidth: 2 },
            }}
          />
          {/* 不良手直し */}
          <VictoryBar
            data={reworkData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: { stroke: "white", strokeWidth: 2 },
            }}
          />
          {/* その他停止 */}
          <VictoryBar
            data={otherStopData}
            labelComponent={<VictoryTooltip />}
            barWidth={14}
            style={{
              data: { stroke: "white", strokeWidth: 2 },
            }}
          />
        </VictoryStack>

        {/* 右Y軸 - 効率値 (0-10) */}
        <VictoryAxis
          dependentAxis
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          tickFormat={(t) => t / 10}
          orientation="right"
          scale={{ y: "linear" }}
        />

        {/* 設備総合効率（OEE）- 線グラフ */}
        <VictoryLine
          data={oeeData}
          domain={{ y: [0, 10] }}
          y={(d) => d.y * 10}
          style={{
            data: {
              strokeWidth: 3,
              stroke: lineColor,
            },
          }}
        />

        {/* 線グラフのポイント */}
        <VictoryScatter
          data={oeeData}
          labelComponent={<VictoryTooltip />}
          labels={({ datum }) => `${datum.y * 10}%`}
          y={(d) => d.y * 10}
          size={5}
          style={{
            data: {
              stroke: lineColor,
              fill: "white",
              strokeWidth: 3,
            },
          }}
        />

        {/* レジェンド */}
        <VictoryLegend
          x={50}
          y={280}
          orientation="horizontal"
          gutter={20}
          style={{
            border: { stroke: "none" },
          }}
          data={[
            { name: "故障", symbol: {} },
            { name: "段取り・調整", symbol: {} },
            { name: "立ち上がり", symbol: {} },
            { name: "速度低下", symbol: {} },
            { name: "不良手直し", symbol: {} },
            { name: "その他停止", symbol: {} },
            {
              name: "設備総合効率(OEE)",
              symbol: { type: "line" },
            },
          ]}
        />
      </SerendieChart>
    </div>
  );
};

export default VictoryStackedBarLineChart;
