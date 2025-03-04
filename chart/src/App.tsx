import { useState } from "react";
import { Button } from "@serendie/ui";
import { css } from "@serendie/ui/css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      })}
    >
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
    </div>
  );
}

export default App;
