import React, { createContext, useContext, ReactNode } from "react";
import { token } from "@serendie/ui/tokens";

/**
 * VisxTheme - Visxライブラリ用のテーマシステム
 *
 * Visxはテーマ機能を内蔵していないため、Reactのコンテキストを使用して
 * テーマ機能を実装します。このアプローチにより、Victoryのテーマシステムと
 * 同様の使い勝手でテーマを適用できます。
 *
 * テーマの構造:
 * - colors: チャートの色に関する設定
 * - typography: フォントに関する設定
 * - spacing: 余白やサイズに関する設定
 * - chart: チャート全体の設定
 */

// テーマの型定義
export interface VisxThemeType {
  colors: {
    // 基本カラー
    primary: string;
    secondary: string;
    tertiary: string;
    // チャート要素のカラー
    axis: string;
    grid: string;
    text: string;
    background: string;
    // カラースケール（複数の要素を表示する場合）
    scale: string[];
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: number;
      medium: number;
      large: number;
    };
  };
  spacing: {
    padding: {
      small: number;
      medium: number;
      large: number;
    };
    margin: {
      small: number;
      medium: number;
      large: number;
    };
    radius: {
      small: number;
      medium: number;
    };
  };
  chart: {
    width: number;
    height: number;
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

// デフォルトテーマの定義
// @serendie/ui/tokensの値を使用
export const defaultTheme: VisxThemeType = {
  colors: {
    primary: token("colors.sd.system.color.impression.primary"),
    secondary: token("colors.sd.system.color.impression.secondary"),
    tertiary: token("colors.sd.system.color.impression.tertiary"),
    axis: token("colors.sd.system.color.component.outline"),
    grid: token("colors.sd.system.color.component.outline"),
    text: token("colors.sd.system.color.component.onSurface"),
    background: token("colors.sd.system.color.component.surface"),
    scale: [
      token("colors.sd.system.color.impression.primary"),
      token("colors.sd.system.color.impression.secondary"),
      token("colors.sd.system.color.impression.tertiary"),
      token("colors.sd.reference.color.scale.green.500"),
      token("colors.sd.reference.color.scale.purple.500"),
    ],
  },
  typography: {
    fontFamily: token("fonts.sd.reference.typography.fontFamily.primary"),
    fontSize: {
      small: 10,
      medium: 12,
      large: 14,
    },
  },
  spacing: {
    padding: {
      small: 5,
      medium: 10,
      large: 20,
    },
    margin: {
      small: 5,
      medium: 10,
      large: 20,
    },
    radius: {
      small: parseInt(token("radii.sd.system.dimension.radius.small")),
      medium: parseInt(token("radii.sd.system.dimension.radius.medium")),
    },
  },
  chart: {
    width: 500,
    height: 300,
    margin: {
      top: 40,
      right: 40,
      bottom: 50,
      left: 60,
    },
  },
};

// テーマコンテキストの作成
const VisxThemeContext = createContext<VisxThemeType>(defaultTheme);

// テーマプロバイダーコンポーネント
interface VisxThemeProviderProps {
  theme?: Partial<VisxThemeType>;
  children: ReactNode;
}

/**
 * VisxThemeProvider - テーマを提供するコンポーネント
 *
 * 使用例:
 * ```tsx
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

  return (
    <VisxThemeContext.Provider value={mergedTheme}>
      {children}
    </VisxThemeContext.Provider>
  );
};

/**
 * useVisxTheme - テーマを取得するためのフック
 *
 * 使用例:
 * ```tsx
 * const theme = useVisxTheme();
 * const primaryColor = theme.colors.primary;
 * ```
 */
export const useVisxTheme = (): VisxThemeType => {
  const theme = useContext(VisxThemeContext);
  if (!theme) {
    throw new Error("useVisxTheme must be used within a VisxThemeProvider");
  }
  return theme;
};
