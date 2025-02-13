import { Button } from "@serendie/ui";
import { css } from "../styled-system/css";

function App() {
  return (
    <div
      className={css({
        width: "sd.reference.dimension.breakpoint.small",
        backgroundColor: "sd.reference.color.scale.gray.200",
      })}
    >
      <Button
        className={css({
          mt: "sd.system.dimension.spacing.fourExtraLarge",
        })}
      >
        Click me
      </Button>
    </div>
  );
}

export default App;
