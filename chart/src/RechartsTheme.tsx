import React, { createContext, useContext, ReactNode } from "react";
import { token } from "@serendie/ui/tokens";

/**
 * RechartsTheme.tsx
 *
 * このファイルはRechartsライブラリ用のカスタムテーマシステムを実装しています。
 * Rechartsはテーマ機能を内蔵していないため、Reactのコンテキストを使用して
 * テーマ機能を実装しています。このアプローチにより、Victoryのテーマシステムと
 * 同様の使い勝手でテーマを適用できます。
 *
 * 主な特徴:
 * - Reactコンテキスト: テーマデータをコンポーネントツリー全体で共有
 * - 型安全: TypeScriptの型定義でテーマ構造を明確に定義
 * - @serendie/ui/tokens統合: デザインシステムのトークンを使用
 * - 部分的なオーバーライド: 必要な部分だけカスタマイズ可能
 *
 * 実装アプローチ:
 * 1. テーマの型定義（RechartsThemeType）
 * 2. デフォルトテーマの定義（defaultTheme）
 * 3. Reactコンテキストの作成（RechartsThemeContext）
 * 4. テーマプロバイダーコンポーネント（RechartsThemeProvider）
 * 5. テーマを取得するためのフック（useRechartsTheme）
 */

// テーマの型定義
// テーマの構造を明確に定義し、型安全性を確保
export interface RechartsThemeType {
  colors: {
    // 基本カラー
    primary: string; // 主要な色（主系列、強調など）
    secondary: string; // 二次的な色（副系列など）
    tertiary: string; // 三次的な色（補助系列など）
    // チャート要素のカラー
    axis: string; // 軸の色
    grid: string; // グリッド線の色
    text: string; // テキストの色
    background: string; // 背景色
    tooltip: {
      background: string; // ツールチップの背景色
      border: string; // ツールチップの境界線の色
      text: string; // ツールチップのテキスト色
    };
    // カラースケール（複数の要素を表示する場合）
    scale: string[]; // データ系列の色の配列
  };
  typography: {
    fontFamily: string; // フォントファミリー
    fontSize: {
      small: number; // 小さいテキスト（補助情報など）
      medium: number; // 中くらいのテキスト（軸ラベルなど）
      large: number; // 大きいテキスト（タイトルなど）
    };
  };
  spacing: {
    padding: {
      small: number; // 小さいパディング
      medium: number; // 中くらいのパディング
      large: number; // 大きいパディング
    };
    margin: {
      top: number; // 上マージン
      right: number; // 右マージン
      bottom: number; // 下マージン
      left: number; // 左マージン
    };
    radius: {
      small: number; // 小さい角丸半径
      medium: number; // 中くらいの角丸半径
    };
  };
  chart: {
    width: string; // チャートの幅（レスポンシブ対応のため文字列）
    height: number; // チャートの高さ
    barSize: number; // 棒グラフの棒の幅
    pieInnerRadius: number; // 円グラフの内側半径（ドーナツチャート用）
    pieOuterRadius: number; // 円グラフの外側半径
  };
  animation: {
    duration: number; // アニメーションの時間（ミリ秒）
  };
}

// デフォルトテーマの定義
// @serendie/ui/tokensの値を使用してデフォルトテーマを定義
// これにより、デザインシステムとの一貫性を確保
export const defaultTheme: RechartsThemeType = {
  colors: {
    // 基本カラーはデザインシステムのトークンから取得
    primary: token("colors.sd.system.color.impression.primary"),
    secondary: token("colors.sd.system.color.impression.secondary"),
    tertiary: token("colors.sd.system.color.impression.tertiary"),
    // チャート要素のカラーもデザインシステムのトークンから取得
    axis: token("colors.sd.system.color.component.outline"),
    grid: token("colors.sd.system.color.component.outline"),
    text: token("colors.sd.system.color.component.onSurface"),
    background: token("colors.sd.system.color.component.surface"),
    tooltip: {
      background: token("colors.sd.system.color.component.surface"),
      border: token("colors.sd.system.color.component.outline"),
      text: token("colors.sd.system.color.component.onSurface"),
    },
    // カラースケールはデザインシステムの色を組み合わせて作成
    scale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
  },
  typography: {
    // フォントファミリーはデザインシステムのトークンから取得
    fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
    // フォントサイズは一般的な値を設定
    fontSize: {
      small: 10,
      medium: 12,
      large: 14,
    },
  },
  spacing: {
    // パディングは一般的な値を設定
    padding: {
      small: 5,
      medium: 10,
      large: 20,
    },
    // マージンはチャートのマージン設定用
    margin: {
      top: 20,
      right: 30,
      left: 20,
      bottom: 5,
    },
    // 角丸半径はデザインシステムのトークンから取得
    radius: {
      small: parseInt(token("radii.sd.system.dimension.radius.small")),
      medium: parseInt(token("radii.sd.system.dimension.radius.medium")),
    },
  },
  chart: {
    // チャートのデフォルトサイズ
    width: "100%", // レスポンシブ対応
    height: 300,
    barSize: 20, // 棒グラフの棒の幅
    pieInnerRadius: 70, // 円グラフの内側半径（ドーナツチャート用）
    pieOuterRadius: 150, // 円グラフの外側半径
  },
  animation: {
    duration: 2000, // アニメーションの時間（ミリ秒）
  },
};

// テーマコンテキストの作成
// Reactのコンテキストを使用してテーマを提供
const RechartsThemeContext = createContext<RechartsThemeType>(defaultTheme);

// テーマプロバイダーコンポーネントの型定義
// 部分的なテーマのオーバーライドをサポート
interface RechartsThemeProviderProps {
  theme?: Partial<RechartsThemeType>; // 部分的なテーマを受け取れるようにする
  children: ReactNode;
}

/**
 * RechartsThemeProvider - テーマを提供するコンポーネント
 *
 * このコンポーネントは、子コンポーネントにテーマを提供します。
 * デフォルトテーマを使用するか、カスタムテーマでオーバーライドできます。
 * 部分的なオーバーライドもサポートしており、必要な部分だけ変更できます。
 *
 * 使用例:
 * ```tsx
 * // デフォルトテーマを使用
 * <RechartsThemeProvider>
 *   <RechartBarChart />
 * </RechartsThemeProvider>
 *
 * // カスタムテーマを使用
 * const customTheme = {
 *   colors: {
 *     primary: "#ff0000",
 *     secondary: "#00ff00",
 *   }
 * };
 *
 * <RechartsThemeProvider theme={customTheme}>
 *   <RechartBarChart />
 *   <RechartPieChart />
 * </RechartsThemeProvider>
 * ```
 */
export const RechartsThemeProvider: React.FC<RechartsThemeProviderProps> = ({
  theme,
  children,
}) => {
  // デフォルトテーマとカスタムテーマをマージ
  // 部分的なオーバーライドをサポートするために、深いマージを行う
  const mergedTheme = theme
    ? {
        ...defaultTheme,
        ...theme,
        colors: {
          ...defaultTheme.colors,
          ...theme.colors,
          tooltip: {
            ...defaultTheme.colors.tooltip,
            ...theme.colors?.tooltip,
          },
        },
        typography: { ...defaultTheme.typography, ...theme.typography },
        spacing: {
          ...defaultTheme.spacing,
          ...theme.spacing,
          margin: {
            ...defaultTheme.spacing.margin,
            ...theme.spacing?.margin,
          },
        },
        chart: { ...defaultTheme.chart, ...theme.chart },
        animation: { ...defaultTheme.animation, ...theme.animation },
      }
    : defaultTheme;

  // コンテキストプロバイダーでテーマを提供
  return (
    <RechartsThemeContext.Provider value={mergedTheme}>
      {children}
    </RechartsThemeContext.Provider>
  );
};

/**
 * useRechartsTheme - テーマを取得するためのフック
 *
 * このフックを使用して、コンポーネント内でテーマにアクセスできます。
 * RechartsThemeProviderの子孫コンポーネント内でのみ使用できます。
 *
 * 使用例:
 * ```tsx
 * const MyComponent = () => {
 *   const theme = useRechartsTheme();
 *
 *   // テーマの値を使用
 *   const primaryColor = theme.colors.primary;
 *   const fontSize = theme.typography.fontSize.medium;
 *
 *   return (
 *     <BarChart>
 *       <Bar fill={primaryColor} />
 *     </BarChart>
 *   );
 * };
 * ```
 */
export const useRechartsTheme = (): RechartsThemeType => {
  // コンテキストからテーマを取得
  const theme = useContext(RechartsThemeContext);

  // テーマが提供されていない場合（RechartsThemeProviderの外で使用された場合）
  if (!theme) {
    throw new Error(
      "useRechartsTheme must be used within a RechartsThemeProvider"
    );
  }

  return theme;
};

console.log(defaultTheme);
