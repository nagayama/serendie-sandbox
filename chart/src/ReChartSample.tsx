import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { css } from "@serendie/ui/css";
import { RechartsThemeProvider, useRechartsTheme } from "./RechartsTheme";
import ChartLegend, { LegendItem } from "./components/ChartLegend";

/**
 * ReChartSample.tsx
 *
 * このファイルはRechartsライブラリを使用したチャートの実装例を提供します。
 * Rechartsは、D3.jsをベースにしたReactチャートライブラリで、
 * 宣言的なAPIと高いカスタマイズ性を兼ね備えています。
 *
 * 主な特徴:
 * - 宣言的API: Reactの思想に沿った宣言的な記述が可能
 * - レスポンシブ: ResponsiveContainerを使用して簡単にレスポンシブ対応
 * - 再利用性: コンポーネントの組み合わせで様々なチャートを構築可能
 * - D3.jsベース: D3.jsの機能を内部で使用しているが、直接D3を扱う必要はない
 *
 * このファイルでは以下のコンポーネントを実装しています:
 * 1. RechartBarChartInner - テーマを使用する棒グラフの内部コンポーネント
 * 2. RechartPieChartInner - テーマを使用する円グラフの内部コンポーネント
 * 3. RechartBarChart - テーマプロバイダーでラップした棒グラフコンポーネント
 * 4. RechartPieChart - テーマプロバイダーでラップした円グラフコンポーネント
 * 5. ReChartSample - 両方のグラフを表示するメインコンポーネント
 *
 * また、カスタムテーマシステムを使用して、スタイルを一元管理しています。
 */

// サンプルデータ
// 四半期ごとの製品A、製品Bの売上データ
// 他のライブラリと同じデータ構造を使用
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
// 製品A、製品Bの総売上を計算
const pieData = [
  { name: "製品A", value: data.reduce((sum, d) => sum + d.productA, 0) },
  { name: "製品B", value: data.reduce((sum, d) => sum + d.productB, 0) },
];

/**
 * RechartBarChartInner - テーマを使用する棒グラフの内部コンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. useRechartsThemeフックを使用してテーマにアクセス
 * 2. ResponsiveContainerでレスポンシブ対応
 * 3. BarChartをコンテナとして使用
 * 4. Barコンポーネントで各データシリーズを表示
 * 5. XAxis、YAxisで軸を設定
 * 6. CartesianGridでグリッド線を表示
 * 7. Tooltipでホバー時の詳細情報を表示
 * 8. Legendで凡例を表示
 *
 * Rechartsの特徴として、各コンポーネントを組み合わせることで
 * 必要な機能を持つチャートを構築できます。
 */
const RechartBarChartInner = () => {
  // テーマからスタイルを取得
  const theme = useRechartsTheme();

  // 凡例アイテムの作成
  const legendItems: LegendItem[] = [
    { key: "productA", label: "製品A", color: theme.colors.primary },
    { key: "productB", label: "製品B", color: theme.colors.secondary },
  ];

  return (
    <div
      className={css({
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: "sd.system.dimension.spacing.large",
        backgroundColor: theme.colors.background,
        borderRadius: "sd.system.dimension.radius.medium",
        boxShadow: "sd.system.elevation.shadow.level1",
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: theme.colors.primary,
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Recharts棒グラフサンプル
      </h2>
      {/* ResponsiveContainer: レスポンシブ対応のためのコンテナ */}
      <ResponsiveContainer
        width={theme.chart.width}
        height={theme.chart.height}
      >
        {/* BarChart: 棒グラフのコンテナ */}
        <BarChart data={data} margin={theme.spacing.margin}>
          {/* CartesianGrid: グリッド線 */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme.colors.grid}
            opacity={0.5}
          />
          {/* XAxis: x軸 */}
          <XAxis
            dataKey="quarter"
            tick={{ fill: theme.colors.text }}
            axisLine={{
              stroke: theme.colors.axis,
            }}
          />
          {/* YAxis: y軸 */}
          <YAxis
            tick={{ fill: theme.colors.text }}
            axisLine={{
              stroke: theme.colors.axis,
            }}
            // 金額表示のフォーマット（千円単位）
            tickFormatter={(value) => `¥${value / 1000}k`}
          />
          {/* Tooltip: ホバー時の詳細情報 */}
          <Tooltip
            formatter={(value) => [`¥${Number(value).toLocaleString()}`, ""]}
            contentStyle={{
              backgroundColor: theme.colors.tooltip.background,
              borderColor: theme.colors.tooltip.border,
              color: theme.colors.tooltip.text,
            }}
          />
          {/* Legend: 凡例 */}
          <Legend
            formatter={(value) => (value === "productA" ? "製品A" : "製品B")}
          />
          {/* Bar: 製品Aの棒グラフ */}
          <Bar
            dataKey="productA"
            name="製品A"
            fill={theme.colors.primary}
            radius={[
              theme.spacing.radius.small,
              theme.spacing.radius.small,
              0,
              0,
            ]} // 棒の上部を角丸に
            animationDuration={theme.animation.duration}
            barSize={theme.chart.barSize}
          />
          {/* Bar: 製品Bの棒グラフ */}
          <Bar
            dataKey="productB"
            name="製品B"
            fill={theme.colors.secondary}
            radius={[
              theme.spacing.radius.small,
              theme.spacing.radius.small,
              0,
              0,
            ]} // 棒の上部を角丸に
            animationDuration={theme.animation.duration}
            barSize={theme.chart.barSize}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* 共通凡例コンポーネントを使用 */}
      <ChartLegend items={legendItems} />
    </div>
  );
};

/**
 * RechartPieChartInner - テーマを使用する円グラフの内部コンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. useRechartsThemeフックを使用してテーマにアクセス
 * 2. ResponsiveContainerでレスポンシブ対応
 * 3. PieChartをコンテナとして使用
 * 4. Pieコンポーネントで円グラフを表示
 * 5. Cellコンポーネントで各セグメントの色を設定
 * 6. Tooltipでホバー時の詳細情報を表示
 *
 * Rechartsの円グラフは、Pieコンポーネントと
 * Cellコンポーネントを組み合わせて実装します。
 */
const RechartPieChartInner = () => {
  // テーマからスタイルを取得
  const theme = useRechartsTheme();

  // 凡例アイテムの作成
  const legendItems: LegendItem[] = pieData.map((d, i) => ({
    key: d.name,
    label: d.name,
    color: theme.colors.scale[i % theme.colors.scale.length],
    value: d.value,
  }));

  return (
    <div
      className={css({
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        padding: "sd.system.dimension.spacing.large",
        backgroundColor: theme.colors.background,
        borderRadius: "sd.system.dimension.radius.medium",
        boxShadow: "sd.system.elevation.shadow.level1",
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: theme.colors.primary,
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Recharts円グラフサンプル
      </h2>
      {/* ResponsiveContainer: レスポンシブ対応のためのコンテナ */}
      <ResponsiveContainer width={theme.chart.width} height={400}>
        {/* PieChart: 円グラフのコンテナ */}
        <PieChart>
          {/* Tooltip: ホバー時の詳細情報 */}
          <Tooltip
            formatter={(value) => [`¥${Number(value).toLocaleString()}`, ""]}
            contentStyle={{
              backgroundColor: theme.colors.tooltip.background,
              borderColor: theme.colors.tooltip.border,
              color: theme.colors.tooltip.text,
            }}
          />
          {/* Pie: 円グラフ本体 */}
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={theme.chart.pieOuterRadius}
            innerRadius={theme.chart.pieInnerRadius} // ドーナツチャート用の内側半径
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            animationDuration={theme.animation.duration}
          >
            {/* Cell: 各セグメントの色を設定 */}
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={theme.colors.scale[index % theme.colors.scale.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* 共通凡例コンポーネントを使用 */}
      <ChartLegend
        items={legendItems}
        valueFormatter={(value) => `¥${(value / 1000).toLocaleString()}k`}
      />
    </div>
  );
};

/**
 * RechartBarChart - テーマプロバイダーでラップした棒グラフコンポーネント
 *
 * このコンポーネントは外部から使用される際にテーマを提供します。
 * RechartsThemeProviderでラップすることで、内部コンポーネントがテーマにアクセスできるようになります。
 *
 * 使用例:
 * ```tsx
 * <RechartBarChart />
 * ```
 */
export const RechartBarChart = () => {
  return (
    <RechartsThemeProvider>
      <RechartBarChartInner />
    </RechartsThemeProvider>
  );
};

/**
 * RechartPieChart - テーマプロバイダーでラップした円グラフコンポーネント
 *
 * このコンポーネントは外部から使用される際にテーマを提供します。
 * RechartsThemeProviderでラップすることで、内部コンポーネントがテーマにアクセスできるようになります。
 *
 * 使用例:
 * ```tsx
 * <RechartPieChart />
 * ```
 */
export const RechartPieChart = () => {
  return (
    <RechartsThemeProvider>
      <RechartPieChartInner />
    </RechartsThemeProvider>
  );
};

/**
 * ReChartSample - 棒グラフと円グラフの両方を表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフと円グラフの両方を縦に並べて表示します。
 * 共通のテーマプロバイダーでラップすることで、両方のグラフで同じテーマを共有できます。
 *
 * 使用例:
 * ```tsx
 * <ReChartSample />
 * ```
 *
 * カスタムテーマを適用する場合:
 * ```tsx
 * <RechartsThemeProvider theme={customTheme}>
 *   <ReChartSample />
 * </RechartsThemeProvider>
 * ```
 */
const ReChartSample = () => {
  return (
    <RechartsThemeProvider>
      <div
        className={css({
          display: "flex",
          gap: "sd.system.dimension.spacing.extraLarge",
        })}
      >
        <RechartBarChartInner />
        <RechartPieChartInner />
      </div>
    </RechartsThemeProvider>
  );
};

export default ReChartSample;
