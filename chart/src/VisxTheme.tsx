import React, { createContext, useContext, ReactNode } from "react";
import { token } from "@serendie/ui/tokens";

/**
 * VisxTheme.tsx
 *
 * このファイルはVisxライブラリ用のカスタムテーマシステムを実装しています。
 * Visxはテーマ機能を内蔵していないため、Reactのコンテキストを使用して
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
 * 1. テーマの型定義（VisxThemeType）
 * 2. デフォルトテーマの定義（defaultTheme）
 * 3. Reactコンテキストの作成（VisxThemeContext）
 * 4. テーマプロバイダーコンポーネント（VisxThemeProvider）
 * 5. テーマを取得するためのフック（useVisxTheme）
 */

// テーマの型定義
// テーマの構造を明確に定義し、型安全性を確保
export interface VisxThemeType {
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
      small: number; // 小さいマージン
      medium: number; // 中くらいのマージン
      large: number; // 大きいマージン
    };
    radius: {
      small: number; // 小さい角丸半径
      medium: number; // 中くらいの角丸半径
    };
  };
  chart: {
    width: number; // チャートの幅
    height: number; // チャートの高さ
    margin: {
      // チャートのマージン
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

// デフォルトテーマの定義
// @serendie/ui/tokensの値を使用してデフォルトテーマを定義
// これにより、デザインシステムとの一貫性を確保
export const defaultTheme: VisxThemeType = {
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
    // マージンは一般的な値を設定
    margin: {
      small: 5,
      medium: 10,
      large: 20,
    },
    // 角丸半径はデザインシステムのトークンから取得
    radius: {
      small: parseInt(token("radii.sd.system.dimension.radius.small")),
      medium: parseInt(token("radii.sd.system.dimension.radius.medium")),
    },
  },
  chart: {
    // チャートのデフォルトサイズ
    width: 500,
    height: 300,
    // チャートのマージン（軸ラベルなどのスペース）
    margin: {
      top: 40,
      right: 40,
      bottom: 50,
      left: 60,
    },
  },
};

// テーマコンテキストの作成
// Reactのコンテキストを使用してテーマを提供
const VisxThemeContext = createContext<VisxThemeType>(defaultTheme);

// テーマプロバイダーコンポーネントの型定義
// 部分的なテーマのオーバーライドをサポート
interface VisxThemeProviderProps {
  theme?: Partial<VisxThemeType>; // 部分的なテーマを受け取れるようにする
  children: ReactNode;
}

/**
 * VisxThemeProvider - テーマを提供するコンポーネント
 *
 * このコンポーネントは、子コンポーネントにテーマを提供します。
 * デフォルトテーマを使用するか、カスタムテーマでオーバーライドできます。
 * 部分的なオーバーライドもサポートしており、必要な部分だけ変更できます。
 *
 * 使用例:
 * ```tsx
 * // デフォルトテーマを使用
 * <VisxThemeProvider>
 *   <VisxBarChart />
 * </VisxThemeProvider>
 *
 * // カスタムテーマを使用
 * const customTheme = {
 *   colors: {
 *     primary: "#ff0000",
 *     secondary: "#00ff00",
 *   }
 * };
 *
 * <VisxThemeProvider theme={customTheme}>
 *   <VisxBarChart />
 *   <VisxPieChart />
 * </VisxThemeProvider>
 * ```
 */
export const VisxThemeProvider: React.FC<VisxThemeProviderProps> = ({
  theme,
  children,
}) => {
  // デフォルトテーマとカスタムテーマをマージ
  // 部分的なオーバーライドをサポートするために、深いマージを行う
  const mergedTheme = theme
    ? {
        ...defaultTheme,
        ...theme,
        colors: { ...defaultTheme.colors, ...theme.colors },
        typography: { ...defaultTheme.typography, ...theme.typography },
        spacing: { ...defaultTheme.spacing, ...theme.spacing },
        chart: { ...defaultTheme.chart, ...theme.chart },
      }
    : defaultTheme;

  // コンテキストプロバイダーでテーマを提供
  return (
    <VisxThemeContext.Provider value={mergedTheme}>
      {children}
    </VisxThemeContext.Provider>
  );
};

/**
 * useVisxTheme - テーマを取得するためのフック
 *
 * このフックを使用して、コンポーネント内でテーマにアクセスできます。
 * VisxThemeProviderの子孫コンポーネント内でのみ使用できます。
 *
 * 使用例:
 * ```tsx
 * const MyComponent = () => {
 *   const theme = useVisxTheme();
 *
 *   // テーマの値を使用
 *   const primaryColor = theme.colors.primary;
 *   const fontSize = theme.typography.fontSize.medium;
 *
 *   return (
 *     <text fill={primaryColor} fontSize={fontSize}>
 *       Hello, world!
 *     </text>
 *   );
 * };
 * ```
 */
export const useVisxTheme = (): VisxThemeType => {
  // コンテキストからテーマを取得
  const theme = useContext(VisxThemeContext);

  // テーマが提供されていない場合（VisxThemeProviderの外で使用された場合）
  if (!theme) {
    throw new Error("useVisxTheme must be used within a VisxThemeProvider");
  }

  return theme;
};
