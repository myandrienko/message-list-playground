import clsx from "clsx";
import type { ComponentProps } from "react";
import { useTabIndex } from "../roving";

import styles from "./Link.module.css";

export function Link(props: ComponentProps<"a">) {
  const tab = useTabIndex();

  return (
    <a
      {...props}
      {...tab}
      className={clsx(styles.root, props.className)}
      target="_blank"
      rel="noopener noreferrer nofollow"
    />
  );
}
