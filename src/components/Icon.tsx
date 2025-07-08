import clsx from "clsx";
import type { ComponentProps } from "react";

import styles from "./Icon.module.css";

export type IconProps = {
  icon: string;
} & ComponentProps<"i">;

export function Icon(props: IconProps) {
  return (
    <i
      className={clsx(styles.root, props.className)}
      style={{ ...props.style, maskImage: `url("${props.icon}")` }}
    />
  );
}
