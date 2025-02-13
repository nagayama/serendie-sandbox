import { Button } from "@serendie/ui";
import { css } from "../styled-system/css";

function App() {
  return (
    <div
      className={css({
        width: "sd.reference.dimension.breakpoint.medium",
        backgroundColor: "sd.reference.color.scale.gray.100",
      })}
    >
      sd.reference.dimension.breakpoint.medium
      <div
        className={css({
          width: "sd.reference.dimension.breakpoint.small",
          backgroundColor: "sd.reference.color.scale.gray.200",
        })}
      >
        sd.reference.dimension.breakpoint.small
      </div>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
