import { useForm } from "react-hook-form";
import { Button, TextField } from "@serendie/ui";
import { css } from "@serendie/ui/css";
import { useCallback } from "react";

export function ReactHookFormSample() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onPasswordChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      setValue("password", e.target.value);
    },
    [setValue]
  );

  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="パスワード"
        invalidMessage={errors["password"]?.message?.toString()}
        placeholder="パスワード"
        className={css({ width: "100%" })}
        {...register("password", {
          required: "このフィールドは必須です",
          onChange: onPasswordChangeHandler,
          validate: (value) => {
            if (value.length < 8) {
              return "パスワードは8文字以上で入力してください";
            }
          },
        })}
        invalid={!!errors["password"]}
      />
      <Button type="submit">送信</Button>
    </form>
  );
}

export function ReactHookForm2() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <TextField
      label="パスワード"
      placeholder="パスワード"
      className={css({ width: "100%" })}
      onChange={onChange}
    />
  );
}
