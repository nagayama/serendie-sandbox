import { DropdownMenu } from "@serendie/ui";
import { SerendieSymbol } from "@serendie/symbols";

export function SelectOnChange() {
  return (
    <DropdownMenu
      items={[
        {
          label: "React",
          value: "React",
          icon: <SerendieSymbol name="placeholder" />,
        },
      ]}
      onSelect={(value) => {
        console.log(value);
      }}
      title="メニュータイトル"
    />
  );
}
