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

// サンプルデータ
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
const pieData = [
  { label: "製品A", value: data.reduce((sum, d) => sum + d.productA, 0) },
  { label: "製品B", value: data.reduce((sum, d) => sum + d.productB, 0) },
];

// アクセサ関数
const getQuarter = (d: (typeof data)[0]) => d.quarter;
const keys = ["productA", "productB"];

// 棒グラフの寸法
const width = 500;
const height = 300;
const margin = { top: 40, right: 40, bottom: 50, left: 60 };

// グラフ領域の計算
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// スケールの設定
const quarterScale = scaleBand<string>({
  domain: data.map(getQuarter),
  padding: 0.2,
});

const productScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});

const valueScale = scaleLinear<number>({
  domain: [0, 20000],
});

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [
    token("colors.sd.system.color.impression.primary"),
    token("colors.sd.system.color.impression.secondary"),
  ],
});

// レイアウトの設定
quarterScale.rangeRound([0, xMax]);
productScale.rangeRound([0, quarterScale.bandwidth()]);
valueScale.range([yMax, 0]);

// 円グラフのアクセサ関数
const getPieValue = (d: (typeof pieData)[0]) => d.value;
const getPieLabel = (d: (typeof pieData)[0]) => d.label;

// 円グラフの寸法
const pieWidth = 400;
const pieHeight = 400;
const radius = Math.min(pieWidth, pieHeight) / 2;
const centerX = pieWidth / 2;
const centerY = pieHeight / 2;

// 円グラフの色
const pieColorScale = scaleOrdinal<string, string>({
  domain: pieData.map(getPieLabel),
  range: [
    token("colors.sd.system.color.impression.primary"),
    token("colors.sd.system.color.impression.secondary"),
  ],
});

export const VisxBarChart = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: token("spacing.sd.system.dimension.spacing.large"),
        backgroundColor: token("colors.sd.system.color.component.surface"),
        borderRadius: token("radii.sd.system.dimension.radius.medium"),
        boxShadow: token("shadows.sd.system.elevation.shadow.level1"),
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: token("colors.sd.system.color.impression.primary"),
          marginBottom: token("spacing.sd.system.dimension.spacing.medium"),
        })}
      >
        Visx棒グラフサンプル
      </h2>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <BarGroup
            data={data}
            keys={keys}
            height={yMax}
            x0={getQuarter}
            x0Scale={quarterScale}
            x1Scale={productScale}
            yScale={valueScale}
            color={colorScale}
          />
          <AxisLeft
            scale={valueScale}
            tickFormat={(value: NumberValue) => `¥${value.valueOf() / 1000}k`}
            stroke={token("colors.sd.system.color.component.outline")}
            tickStroke={token("colors.sd.system.color.component.outline")}
            tickLabelProps={() => ({
              fill: token("colors.sd.system.color.component.onSurface"),
              fontSize: 12,
              textAnchor: "end",
              dy: "0.33em",
            })}
          />
          <AxisBottom
            top={yMax}
            scale={quarterScale}
            stroke={token("colors.sd.system.color.component.outline")}
            tickStroke={token("colors.sd.system.color.component.outline")}
            tickLabelProps={() => ({
              fill: token("colors.sd.system.color.component.onSurface"),
              fontSize: 12,
              textAnchor: "middle",
            })}
          />
        </Group>
      </svg>
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          marginTop: token("spacing.sd.system.dimension.spacing.medium"),
        })}
      >
        {keys.map((key) => (
          <div
            key={key}
            className={css({
              display: "flex",
              alignItems: "center",
              marginRight: token("spacing.sd.system.dimension.spacing.medium"),
            })}
          >
            <div
              className={css({
                width: "12px",
                height: "12px",
                marginRight: "6px",
                backgroundColor: colorScale(key),
                borderRadius: token(
                  "radii.sd.system.dimension.radius.extraSmall"
                ),
              })}
            />
            <span>{key === "productA" ? "製品A" : "製品B"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const VisxPieChart = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: token("spacing.sd.system.dimension.spacing.large"),
        backgroundColor: token("colors.sd.system.color.component.surface"),
        borderRadius: token("radii.sd.system.dimension.radius.medium"),
        boxShadow: token("shadows.sd.system.elevation.shadow.level1"),
        maxWidth: "600px",
        margin: "0 auto",
      })}
    >
      <h2
        className={css({
          color: token("colors.sd.system.color.impression.primary"),
          marginBottom: token("spacing.sd.system.dimension.spacing.medium"),
        })}
      >
        Visx円グラフサンプル
      </h2>
      <svg width={pieWidth} height={pieHeight}>
        <GradientPinkBlue id="visx-pie-gradient" />
        <Group top={centerY} left={centerX}>
          <Pie
            data={pieData}
            pieValue={getPieValue}
            outerRadius={radius - 20}
            innerRadius={radius - 100}
            padAngle={0.01}
          >
            {(pie) => {
              return pie.arcs.map((arc, index) => {
                const { label } = arc.data;
                const [centroidX, centroidY] = pie.path.centroid(arc);
                const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;
                const arcPath = pie.path(arc) || "";
                const arcFill = pieColorScale(label);
                return (
                  <g key={`arc-${index}`}>
                    <path d={arcPath} fill={arcFill} />
                    {hasSpaceForLabel && (
                      <Text
                        x={centroidX}
                        y={centroidY}
                        dy=".33em"
                        fill={token(
                          "colors.sd.system.color.component.inverseSurface"
                        )}
                        fontSize={14}
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
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          marginTop: token("spacing.sd.system.dimension.spacing.medium"),
        })}
      >
        {pieData.map((d) => (
          <div
            key={d.label}
            className={css({
              display: "flex",
              alignItems: "center",
              marginRight: token("spacing.sd.system.dimension.spacing.medium"),
            })}
          >
            <div
              className={css({
                width: "12px",
                height: "12px",
                marginRight: "6px",
                backgroundColor: pieColorScale(d.label),
                borderRadius: token(
                  "radii.sd.system.dimension.radius.extraSmall"
                ),
              })}
            />
            <span>
              {d.label}: ¥{(d.value / 1000).toLocaleString()}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// デフォルトエクスポートは棒グラフと円グラフの両方を含むコンポーネント
const VisxSample = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: token("spacing.sd.system.dimension.spacing.extraLarge"),
      })}
    >
      <VisxBarChart />
      <VisxPieChart />
    </div>
  );
};

export default VisxSample;
