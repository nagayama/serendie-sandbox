import React, { useEffect } from "react";
import { DropdownMenu } from "@serendie/ui";

const themes = [
  {
    value: "konjo",
    label: "Konjo",
  },
  {
    value: "asagi",
    label: "Asagi",
  },
  {
    value: "kurikawa",
    label: "Kurikawa",
  },
  {
    value: "sumire",
    label: "Sumire",
  },
  {
    value: "tsutsuji",
    label: "Tsutsuji",
  },
];

type Theme = (typeof themes)[number]["value"];

/**
 * ThemeChanger - Panda CSSのテーマを切り替えるコンポーネント
 *
 * このコンポーネントは、Panda CSSのテーマを切り替えるためのUIを提供します。
 * data-panda-theme属性を切り替えることで、テーマを変更します。
 *
 * 使用例:
 * ```tsx
 * <ThemeChanger />
 * ```
 */
export const ThemeChanger: React.FC = () => {
  // 現在のテーマを取得
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const theme = document.documentElement.getAttribute("data-panda-theme");
      return (theme as Theme) || "konjo";
    }
    return "konjo";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-panda-theme", currentTheme);
    }
  }, [currentTheme]);

  // テーマを切り替える関数
  const handleThemeChange = (value: string) => {
    setCurrentTheme(value as Theme);
  };

  // 現在のテーマのラベルを取得
  const currentThemeLabel =
    themes.find((theme) => theme.value === currentTheme)?.label || "あさぎ";

  // ドロップダウンメニューのアイテムを生成
  const items = themes.map((theme) => ({
    value: theme.value,
    label: `${theme.label}テーマ`,
    selected: theme.value === currentTheme,
  }));

  return (
    <DropdownMenu
      title={currentThemeLabel}
      items={items}
      onSelect={(value) => handleThemeChange(value.value)}
    />
  );
};
