import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryLegend,
  VictoryPie,
  VictoryContainer,
} from "victory";
import { token } from "@serendie/ui/tokens";
import { css } from "@serendie/ui/css";

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

// Victoryのデータ形式に変換
const productAData = data.map((d, i) => ({ x: i + 1, y: d.productA }));
const productBData = data.map((d, i) => ({ x: i + 1, y: d.productB }));

// 円グラフ用データ
const pieData = [
  { x: "製品A", y: data.reduce((sum, d) => sum + d.productA, 0) },
  { x: "製品B", y: data.reduce((sum, d) => sum + d.productB, 0) },
];

export const VictoryBarChart = () => {
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
        Victory棒グラフサンプル
      </h2>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        width={500}
        height={300}
      >
        <VictoryLegend
          x={125}
          y={10}
          orientation="horizontal"
          gutter={20}
          style={{
            labels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
          }}
          data={[
            {
              name: "製品A",
              symbol: {
                fill: token("colors.sd.system.color.impression.primary"),
              },
            },
            {
              name: "製品B",
              symbol: {
                fill: token("colors.sd.system.color.impression.secondary"),
              },
            },
          ]}
        />
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Q1", "Q2", "Q3", "Q4"]}
          style={{
            axis: {
              stroke: token("colors.sd.system.color.component.outline"),
            },
            tickLabels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => `¥${x / 1000}k`}
          style={{
            axis: {
              stroke: token("colors.sd.system.color.component.outline"),
            },
            tickLabels: {
              fill: token("colors.sd.system.color.component.onSurface"),
            },
          }}
        />
        <VictoryGroup
          offset={20}
          colorScale={[
            token("colors.sd.system.color.impression.primary"),
            token("colors.sd.system.color.impression.secondary"),
          ]}
        >
          <VictoryBar
            data={productAData}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
          <VictoryBar
            data={productBData}
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

export const VictoryPieChart = () => {
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
        Victory円グラフサンプル
      </h2>
      <VictoryPie
        data={pieData}
        width={400}
        height={400}
        colorScale={[
          token("colors.sd.system.color.impression.primary"),
          token("colors.sd.system.color.impression.secondary"),
        ]}
        innerRadius={70}
        labelRadius={({ innerRadius }) => (innerRadius as number) + 30}
        style={{
          labels: {
            fill: token("colors.sd.system.color.component.onSurface"),
            fontSize: 14,
          },
        }}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        labels={({ datum }) => `${datum.x}: ¥${datum.y / 1000}k`}
        containerComponent={
          <VictoryContainer
            style={{
              touchAction: "auto",
            }}
          />
        }
      />
      <div
        className={css({
          display: "flex",
          justifyContent: "center",
          marginTop: token("spacing.sd.system.dimension.spacing.medium"),
        })}
      >
        {pieData.map((d, i) => (
          <div
            key={d.x}
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
                backgroundColor:
                  i === 0
                    ? token("colors.sd.system.color.impression.primary")
                    : token("colors.sd.system.color.impression.secondary"),
                borderRadius: token(
                  "radii.sd.system.dimension.radius.extraSmall"
                ),
              })}
            />
            <span>
              {d.x}: ¥{(d.y / 1000).toLocaleString()}k
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// デフォルトエクスポートは棒グラフと円グラフの両方を含むコンポーネント
const VictorySample = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: token("spacing.sd.system.dimension.spacing.extraLarge"),
      })}
    >
      <VictoryBarChart />
      <VictoryPieChart />
    </div>
  );
};

export default VictorySample;
