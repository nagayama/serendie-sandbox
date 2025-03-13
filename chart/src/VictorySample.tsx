import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryPie,
  VictoryContainer,
  VictoryLine,
  VictoryScatter,
  VictoryLabel,
} from "victory";
import { css } from "@serendie/ui/css";
import { token } from "@serendie/ui/tokens";
import SerendieTheme from "./VictoryTheme";
import ChartLegend, { LegendItem } from "./components/ChartLegend";

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
 * 3. VictoryBarLineChart - 棒グラフと線グラフを組み合わせたコンポーネント
 * 4. VictorySample - 棒グラフと円グラフと線グラフを表示するメインコンポーネント
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
        domainPadding={{ x: 50 }} // バーの端がチャートの端に接触しないようにパディングを設定
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
        theme={SerendieTheme} // カスタムテーマを適用
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

      {/* VictoryChart: チャート全体のコンテナ */}
      <VictoryChart
        theme={SerendieTheme}
        domainPadding={{ x: 25 }}
        padding={{ top: 50, bottom: 50, left: 60, right: 100 }}
        width={500}
        height={300}
        containerComponent={<VictoryContainer />}
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
      </VictoryChart>
    </div>
  );
};

/**
 * VictorySample - 棒グラフと円グラフと線グラフを表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフと円グラフと線グラフを縦に並べて表示します。
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
        flexDirection: "column",
        gap: token("spacing.sd.system.dimension.spacing.extraLarge"),
      })}
    >
      <div
        className={css({
          display: "flex",
          gap: "sd.system.dimension.spacing.extraLarge",
        })}
      >
        <VictoryBarChart />
        <VictoryPieChart />
      </div>
      <VictoryBarLineChart />
    </div>
  );
};

export default VictorySample;
