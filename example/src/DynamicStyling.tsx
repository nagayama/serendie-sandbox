import { useState } from "react";
import { SerendieSymbol } from "@serendie/symbols";
import { Box, HStack } from "@serendie/ui/jsx";
import { Button } from "@serendie/ui";
import { css } from "@serendie/ui/css";

export function DynamicStyling() {
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    <Box>
      <HStack gap="sd.system.dimension.spacing.twoExtraSmall">
        <SerendieSymbol
          name="check-circle"
          variant="filled"
          className={getStyles(isHighlighted).symbolStyle}
        />
        <p className={getStyles(isHighlighted).typographylStyle}>
          サンプルテキスト
        </p>
      </HStack>
      <Button
        onClick={() => {
          setIsHighlighted(!isHighlighted);
        }}
      >
        スタイル切り替え
      </Button>
    </Box>
  );
}

const getStyles = (isHighlighted: boolean) => {
  if (isHighlighted) {
    return {
      symbolStyle: css({
        color: "sd.system.color.impression.positive",
      }),
      typographylStyle: css({
        color: "sd.system.color.impression.positive",
      }),
    };
  } else {
    return {
      symbolStyle: css({
        color: "sd.system.color.interaction.disabledOnSurface",
      }),
      typographylStyle: css({
        color: "sd.system.color.interaction.disabledOnSurface",
      }),
    };
  }
};
