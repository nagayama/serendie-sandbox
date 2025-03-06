import React from "react";
import { css } from "@serendie/ui/css";

/**
 * ChartLegend - チャート用の共通凡例コンポーネント
 *
 * このコンポーネントは、各チャートライブラリ（Visx、Victory、Recharts）で
 * 共通して使用できる凡例を提供します。
 *
 * 特徴:
 * - 一貫したデザイン: すべてのチャートで同じデザインの凡例を使用
 * - 柔軟性: 様々なデータ形式に対応
 * - カスタマイズ可能: 色やラベルのフォーマットをカスタマイズ可能
 */

// 凡例アイテムの型定義
export interface LegendItem {
  key: string; // 一意のキー
  label: string; // 表示ラベル
  color: string; // 色
  value?: number; // 値（オプション）
}

// 凡例コンポーネントのプロパティ
interface ChartLegendProps {
  items: LegendItem[]; // 凡例アイテムの配列
  valueFormatter?: (value: number) => string; // 値のフォーマッター（オプション）
  direction?: "horizontal" | "vertical"; // 凡例の方向（オプション）
  className?: string; // 追加のクラス名（オプション）
}

/**
 * ChartLegend - チャート用の共通凡例コンポーネント
 *
 * 使用例:
 * ```tsx
 * const legendItems = [
 *   { key: "productA", label: "製品A", color: theme.colors.primary, value: 55000 },
 *   { key: "productB", label: "製品B", color: theme.colors.secondary, value: 50000 }
 * ];
 *
 * <ChartLegend
 *   items={legendItems}
 *   valueFormatter={(value) => `¥${(value / 1000).toLocaleString()}k`}
 * />
 * ```
 */
const ChartLegend: React.FC<ChartLegendProps> = ({
  items,
  valueFormatter,
  direction = "horizontal",
  className,
}) => {
  return (
    <div
      className={`${css({
        display: "flex",
        flexDirection: direction === "horizontal" ? "row" : "column",
        justifyContent: "center",
        alignItems: direction === "horizontal" ? "center" : "flex-start",
        gap: "sd.system.dimension.spacing.medium",
        marginTop: "sd.system.dimension.spacing.medium",
      })} ${className || ""}`}
    >
      {items.map((item) => (
        <div
          key={item.key}
          className={css({
            display: "flex",
            alignItems: "center",
            gap: "sd.system.dimension.spacing.small",
          })}
        >
          <div
            className={css({
              width: "12px",
              height: "12px",
              backgroundColor: item.color,
              borderRadius: "sd.system.dimension.radius.extraSmall",
            })}
          />
          <span>
            {item.label}
            {item.value !== undefined && valueFormatter
              ? `: ${valueFormatter(item.value)}`
              : ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
