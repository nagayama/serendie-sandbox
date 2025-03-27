import React from "react";
import { VictoryPie, VictoryContainer } from "victory";
import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import SerendieTheme from "./components/VictoryTheme";
import ChartLegend, { LegendItem } from "../../components/ChartLegend";

/**
 * VictoryPieChart - Victoryを使用した円グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. VictoryPieで円グラフを表示
 * 2. アニメーションとラベルを設定
 * 3. 凡例を表示
 *
 * 注意: VictoryPieはVictoryChartを使用しないため、SerendieChartではなく
 * 直接SerendieThemeを適用しています。
 */
export const VictoryPieChart: React.FC = () => {
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

  // 円グラフ用データ
  // 製品A、製品Bの総売上を計算し、Victoryの形式に変換
  const pieData = [
    { x: "製品A", y: data.reduce((sum, d) => sum + d.productA, 0) },
    { x: "製品B", y: data.reduce((sum, d) => sum + d.productB, 0) },
  ];

  // 凡例アイテムの作成
  const legendItems: LegendItem[] = pieData.map((d, i) => ({
    key: d.x,
    label: d.x,
    color:
      SerendieTheme.pie?.colorScale?.[i] ||
      (i === 0
        ? token("colors.sd.system.color.impression.primary")
        : token("colors.sd.system.color.impression.secondary")),
    value: d.y,
  }));

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
        theme={SerendieTheme} // SerendieThemeを直接適用
        innerRadius={70} // 内側の半径（ドーナツ形状）
        labelRadius={({ innerRadius }) => (innerRadius as number) + 30} // ラベルの配置半径
        animate={{
          // アニメーション設定
          duration: 2000,
          onLoad: { duration: 1000 },
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

      {/* 共通凡例コンポーネントを使用 */}
      <ChartLegend
        items={legendItems}
        valueFormatter={(value) => `¥${(value / 1000).toLocaleString()}k`}
      />
    </div>
  );
};

export default VictoryPieChart;
