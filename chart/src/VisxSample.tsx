import React from "react";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { NumberValue } from "d3-scale";
import { token } from "@serendie/ui/tokens";
import { css } from "@serendie/ui/css";
import { Pie } from "@visx/shape";
import { Text } from "@visx/text";
import { GradientPinkBlue } from "@visx/gradient";
import { VisxThemeProvider, useVisxTheme } from "./VisxTheme";
import ChartLegend, { LegendItem } from "./components/ChartLegend";

/**
 * VisxSample.tsx
 *
 * このファイルはVisxライブラリを使用したチャートの実装例を提供します。
 * Visxは低レベルなSVGコンポーネントを提供するライブラリで、D3.jsの概念に基づいています。
 *
 * 主な特徴:
 * - モジュラー設計: 必要なコンポーネントだけをインポートできる
 * - 柔軟性: SVGの詳細な制御が可能
 * - Reactとの統合: ReactコンポーネントとしてSVG要素を扱える
 *
 * このファイルでは以下のコンポーネントを実装しています:
 * 1. VisxBarChart - 棒グラフコンポーネント
 * 2. VisxPieChart - 円グラフコンポーネント
 * 3. VisxSample - 両方のグラフを表示するメインコンポーネント
 *
 * また、カスタムテーマシステムを使用して、スタイルを一元管理しています。
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

// 円グラフ用データ
// 製品A、製品Bの総売上を計算
const pieData = [
  { label: "製品A", value: data.reduce((sum, d) => sum + d.productA, 0) },
  { label: "製品B", value: data.reduce((sum, d) => sum + d.productB, 0) },
];

// アクセサ関数
// データから四半期を取得するアクセサ
const getQuarter = (d: (typeof data)[0]) => d.quarter;
// グラフに表示する製品のキー
const keys = ["productA", "productB"];

/**
 * VisxBarChartInner - テーマを使用する棒グラフの内部コンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. useVisxThemeフックを使用してテーマにアクセス
 * 2. スケールの設定（x軸、y軸、色）
 * 3. SVG要素の描画（棒グラフ、軸、凡例）
 *
 * Visxの特徴として、各要素（棒、軸など）を個別に制御できます。
 * これにより高度なカスタマイズが可能ですが、実装の複雑さも増します。
 */
const VisxBarChartInner = () => {
  // テーマからスタイルを取得
  const theme = useVisxTheme();

  // グラフの寸法
  // テーマから寸法を取得することで、一貫性のあるサイズ設定が可能
  const width = theme.chart.width;
  const height = theme.chart.height;
  const margin = theme.chart.margin;

  // グラフ領域の計算
  // マージンを考慮した実際の描画領域を計算
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // スケールの設定
  // scaleBand: カテゴリカルなデータ（四半期）をx軸に配置するためのスケール
  const quarterScale = scaleBand<string>({
    domain: data.map(getQuarter), // 四半期の配列
    padding: 0.2, // バー間のパディング
  });

  // productScale: 製品ごとのバーを配置するためのスケール
  const productScale = scaleBand<string>({
    domain: keys, // 製品キーの配列
    padding: 0.1, // 製品バー間のパディング
  });

  // valueScale: 売上金額をy軸の高さに変換するためのスケール
  const valueScale = scaleLinear<number>({
    domain: [0, 20000], // 売上の範囲
  });

  // テーマの色を使用してカラースケールを設定
  // 各製品に対応する色を定義
  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [theme.colors.primary, theme.colors.secondary],
  });

  // レイアウトの設定
  // スケールの範囲を設定（実際のピクセル値）
  quarterScale.rangeRound([0, xMax]);
  productScale.rangeRound([0, quarterScale.bandwidth()]);
  valueScale.range([yMax, 0]); // 注: y軸は上下が反転（0が下）

  // 凡例アイテムの作成
  const legendItems: LegendItem[] = keys.map((key) => ({
    key,
    label: key === "productA" ? "製品A" : "製品B",
    color: colorScale(key),
  }));

  return (
    <div
      className={css({
        display: "flex",
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
        Visx棒グラフサンプル
      </h2>
      {/* SVG要素: チャート全体のコンテナ */}
      <svg width={width} height={height}>
        {/* Group要素: マージンを適用するためのコンテナ */}
        <Group left={margin.left} top={margin.top}>
          {/* BarGroup: グループ化された棒グラフを描画 */}
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={getQuarter} // 主軸（四半期）
            x0Scale={quarterScale} // 主軸のスケール
            x1Scale={productScale} // 副軸（製品）のスケール
            yScale={valueScale} // 値のスケール
            color={colorScale} // 色のスケール
          />
          {/* AxisLeft: y軸を描画 */}
          <AxisLeft
            scale={valueScale}
            // 金額表示のフォーマット（千円単位）
            tickFormat={(value: NumberValue) => `¥${value.valueOf() / 1000}k`}
            stroke={theme.colors.axis}
            tickStroke={theme.colors.axis}
            tickLabelProps={() => ({
              fill: theme.colors.text,
              fontSize: theme.typography.fontSize.medium,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
          {/* AxisBottom: x軸を描画 */}
          <AxisBottom
            top={yMax} // グラフの下部に配置
            scale={quarterScale}
            stroke={theme.colors.axis}
            tickStroke={theme.colors.axis}
            tickLabelProps={() => ({
              fill: theme.colors.text,
              fontSize: theme.typography.fontSize.medium,
              textAnchor: "middle",
            })}
          />
        </Group>
      </svg>
      {/* 共通凡例コンポーネントを使用 */}
      <ChartLegend items={legendItems} />
    </div>
  );
};

/**
 * VisxPieChartInner - テーマを使用する円グラフの内部コンポーネント
 *
 * このコンポーネントは以下の役割を持ちます:
 * 1. useVisxThemeフックを使用してテーマにアクセス
 * 2. 円グラフのレイアウト設定
 * 3. SVG要素の描画（円グラフ、ラベル、凡例）
 *
 * Visxの円グラフは、Pieコンポーネントを使用して実装します。
 * Pieコンポーネントは、データをセグメントに変換し、各セグメントのパスを生成します。
 * レンダープロップパターンを使用して、セグメントのカスタマイズが可能です。
 */
const VisxPieChartInner = () => {
  // テーマからスタイルを取得
  const theme = useVisxTheme();

  // 円グラフのアクセサ関数
  // データから値を取得するアクセサ
  const getPieValue = (d: (typeof pieData)[0]) => d.value;
  // データからラベルを取得するアクセサ
  const getPieLabel = (d: (typeof pieData)[0]) => d.label;

  // 円グラフの寸法
  const pieWidth = 400;
  const pieHeight = 400;
  const radius = Math.min(pieWidth, pieHeight) / 2;
  const centerX = pieWidth / 2;
  const centerY = pieHeight / 2;

  // テーマの色を使用して円グラフの色を設定
  const pieColorScale = scaleOrdinal<string, string>({
    domain: pieData.map(getPieLabel),
    range: [theme.colors.primary, theme.colors.secondary],
  });

  // 凡例アイテムの作成
  const legendItems: LegendItem[] = pieData.map((d) => ({
    key: d.label,
    label: d.label,
    color: pieColorScale(d.label),
    value: d.value,
  }));

  return (
    <div
      className={css({
        display: "flex",
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
        Visx円グラフサンプル
      </h2>
      {/* SVG要素: チャート全体のコンテナ */}
      <svg width={pieWidth} height={pieHeight}>
        {/* グラデーションの定義（この例では使用していないが、拡張性のために残している） */}
        <GradientPinkBlue id="visx-pie-gradient" />
        {/* Group要素: 円グラフを中央に配置 */}
        <Group top={centerY} left={centerX}>
          {/* Pie: 円グラフを描画 */}
          <Pie
            data={pieData}
            pieValue={getPieValue} // 値のアクセサ
            outerRadius={radius - 20} // 外側の半径
            innerRadius={radius - 100} // 内側の半径（ドーナツ形状）
            padAngle={0.01} // セグメント間の隙間
          >
            {/* レンダープロップ: 各セグメントのカスタマイズ */}
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { label } = arc.data;
                // セグメントの中心点を計算（ラベル配置用）
                const [centroidX, centroidY] = pie.path.centroid(arc);
                // ラベルを表示するスペースがあるか確認
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                // セグメントのパスを取得
                const arcPath = pie.path(arc) || "";
                // セグメントの色を取得
                const arcFill = pieColorScale(label);
                return (
                  <g key={`arc-${index}`}>
                    {/* セグメントのパス */}
                    <path d={arcPath} fill={arcFill} />
                    {/* ラベル（スペースがある場合のみ表示） */}
                    {hasSpaceForLabel && (
                      <Text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill={token(
                          "colors.sd.system.color.component.inverseSurface"
                        )}
                        fontSize={theme.typography.fontSize.medium}
                        textAnchor="middle"
                        pointerEvents="none"
                      >
                        {label}
                      </Text>
                    )}
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      {/* 共通凡例コンポーネントを使用 */}
      <ChartLegend
        items={legendItems}
        valueFormatter={(value) => `¥${(value / 1000).toLocaleString()}k`}
      />
    </div>
  );
};

/**
 * VisxBarChart - テーマプロバイダーでラップした棒グラフコンポーネント
 *
 * このコンポーネントは外部から使用される際にテーマを提供します。
 * VisxThemeProviderでラップすることで、内部コンポーネントがテーマにアクセスできるようになります。
 *
 * 使用例:
 * ```tsx
 * <VisxBarChart />
 * ```
 */
export const VisxBarChart = () => {
  return (
    <VisxThemeProvider>
      <VisxBarChartInner />
    </VisxThemeProvider>
  );
};

/**
 * VisxPieChart - テーマプロバイダーでラップした円グラフコンポーネント
 *
 * このコンポーネントは外部から使用される際にテーマを提供します。
 * VisxThemeProviderでラップすることで、内部コンポーネントがテーマにアクセスできるようになります。
 *
 * 使用例:
 * ```tsx
 * <VisxPieChart />
 * ```
 */
export const VisxPieChart = () => {
  return (
    <VisxThemeProvider>
      <VisxPieChartInner />
    </VisxThemeProvider>
  );
};

/**
 * VisxSample - 棒グラフと円グラフの両方を表示するメインコンポーネント
 *
 * このコンポーネントは、棒グラフと円グラフの両方を縦に並べて表示します。
 * 共通のテーマプロバイダーでラップすることで、両方のグラフで同じテーマを共有できます。
 *
 * 使用例:
 * ```tsx
 * <VisxSample />
 * ```
 *
 * カスタムテーマを適用する場合:
 * ```tsx
 * <VisxThemeProvider theme={customTheme}>
 *   <VisxSample />
 * </VisxThemeProvider>
 * ```
 */
const VisxSample = () => {
  return (
    <VisxThemeProvider>
      <div
        className={css({
          display: "flex",
          gap: "sd.system.dimension.spacing.extraLarge",
        })}
      >
        <VisxBarChartInner />
        <VisxPieChartInner />
      </div>
    </VisxThemeProvider>
  );
};

export default VisxSample;
