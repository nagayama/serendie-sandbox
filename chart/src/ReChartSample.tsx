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
import { token } from "@serendie/ui/tokens";
import { css } from "@serendie/ui/css";

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
 * 1. RechartBarChart - 棒グラフコンポーネント
 * 2. RechartPieChart - 円グラフコンポーネント
 * 3. ReChartSample - 両方のグラフを表示するメインコンポーネント
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

// 色の配列
const COLORS = [
  token("colors.sd.system.color.impression.primary"),
  token("colors.sd.system.color.impression.secondary"),
];

/**
 * RechartBarChart - Rechartsを使用した棒グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. ResponsiveContainerでレスポンシブ対応
 * 2. BarChartをコンテナとして使用
 * 3. Barコンポーネントで各データシリーズを表示
 * 4. XAxis、YAxisで軸を設定
 * 5. CartesianGridでグリッド線を表示
 * 6. Tooltipでホバー時の詳細情報を表示
 * 7. Legendで凡例を表示
 *
 * Rechartsの特徴として、各コンポーネントを組み合わせることで
 * 必要な機能を持つチャートを構築できます。
 */
export const RechartBarChart = () => {
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
        flex: 1,
      })}
    >
      <h2
        className={css({
          color: "sd.system.color.impression.primary",
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Recharts棒グラフサンプル
      </h2>
      {/* ResponsiveContainer: レスポンシブ対応のためのコンテナ */}
      <ResponsiveContainer width="100%" height={300}>
        {/* BarChart: 棒グラフのコンテナ */}
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* CartesianGrid: グリッド線 */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={token("colors.sd.system.color.component.outline")}
            opacity={0.5}
          />
          {/* XAxis: x軸 */}
          <XAxis
            dataKey="quarter"
            tick={{ fill: token("colors.sd.system.color.component.onSurface") }}
            axisLine={{
              stroke: token("colors.sd.system.color.component.outline"),
            }}
          />
          {/* YAxis: y軸 */}
          <YAxis
            tick={{ fill: token("colors.sd.system.color.component.onSurface") }}
            axisLine={{
              stroke: token("colors.sd.system.color.component.outline"),
            }}
            // 金額表示のフォーマット（千円単位）
            tickFormatter={(value) => `¥${value / 1000}k`}
          />
          {/* Tooltip: ホバー時の詳細情報 */}
          <Tooltip
            formatter={(value) => [`¥${Number(value).toLocaleString()}`, ""]}
            contentStyle={{
              backgroundColor: token(
                "colors.sd.system.color.component.surface"
              ),
              borderColor: token("colors.sd.system.color.component.outline"),
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
            fill={token("colors.sd.system.color.impression.primary")}
            radius={[4, 4, 0, 0]} // 棒の上部を角丸に
            animationDuration={2000}
          />
          {/* Bar: 製品Bの棒グラフ */}
          <Bar
            dataKey="productB"
            name="製品B"
            fill={token("colors.sd.system.color.impression.secondary")}
            radius={[4, 4, 0, 0]} // 棒の上部を角丸に
            animationDuration={2000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * RechartPieChart - Rechartsを使用した円グラフコンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. ResponsiveContainerでレスポンシブ対応
 * 2. PieChartをコンテナとして使用
 * 3. Pieコンポーネントで円グラフを表示
 * 4. Cellコンポーネントで各セグメントの色を設定
 * 5. Tooltipでホバー時の詳細情報を表示
 *
 * Rechartsの円グラフは、Pieコンポーネントと
 * Cellコンポーネントを組み合わせて実装します。
 */
export const RechartPieChart = () => {
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
        flex: 1,
      })}
    >
      <h2
        className={css({
          color: "sd.system.color.impression.primary",
          marginBottom: "sd.system.dimension.spacing.medium",
        })}
      >
        Recharts円グラフサンプル
      </h2>
      {/* ResponsiveContainer: レスポンシブ対応のためのコンテナ */}
      <ResponsiveContainer width="100%" height={400}>
        {/* PieChart: 円グラフのコンテナ */}
        <PieChart>
          {/* Tooltip: ホバー時の詳細情報 */}
          <Tooltip
            formatter={(value) => [`¥${Number(value).toLocaleString()}`, ""]}
            contentStyle={{
              backgroundColor: token(
                "colors.sd.system.color.component.surface"
              ),
              borderColor: token("colors.sd.system.color.component.outline"),
            }}
          />
          {/* Pie: 円グラフ本体 */}
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            innerRadius={70} // ドーナツチャート用の内側半径
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            animationDuration={2000}
          >
            {/* Cell: 各セグメントの色を設定 */}
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
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
            key={d.name}
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
                backgroundColor: COLORS[i],
                borderRadius: "sd.system.dimension.radius.extraSmall",
              })}
            />
            <span>
              {d.name}: ¥{(d.value / 1000).toLocaleString()}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ReChartSample - 棒グラフと円グラフの両方を表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフと円グラフの両方を縦に並べて表示します。
 * Rechartsの特徴として、ResponsiveContainerを使用することで
 * レスポンシブなチャートを簡単に実装できます。
 *
 * 使用例:
 * ```tsx
 * <ReChartSample />
 * ```
 */
const ReChartSample = () => {
  return (
    <div
      className={css({
        display: "flex",
        gap: "sd.system.dimension.spacing.extraLarge",
      })}
    >
      <RechartBarChart />
      <RechartPieChart />
    </div>
  );
};

export default ReChartSample;
