import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  destructive?: boolean;
} & ComponentProps<"button">;

export function Button(props: ButtonProps) {
  const { destructive, ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={clsx(
        styles.button,
        destructive && styles.button_destructive,
        props.className
      )}
    >
      {props.children}
    </button>
  );
}
