import clsx from "clsx";
import type { User } from "../data/users";

import styles from "./Userpic.module.css";

export interface UserpicProps {
  user: User;
  status: "online" | "offline" | "none";
}

export function Userpic(props: UserpicProps) {
  return (
    <div className={styles.root}>
      <img
        className={styles.img}
        src={`/userpics/${props.user.id}.jpg`}
        width={48}
        height={48}
        alt={props.user.name}
      />
      <i
        aria-label={`Status: props.status`}
        className={clsx(styles.status, {
          [styles.status_online]: props.status === "online",
          [styles.status_offline]: props.status === "offline",
        })}
      />
    </div>
  );
}
