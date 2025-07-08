import type { Message } from "../data/messages";
import { MessageActions } from "./MessageActions";
import { MessageListItem } from "./MessageListItem";

import styles from "./MessageMenu.module.css";

export function MessageMenu(props: { message: Message }) {
  return (
    <div className={styles.root}>
      <div className={styles.message}>
        <MessageListItem message={props.message} includeHeader />
      </div>
      <div className={styles.actions}>
        <MessageActions orientation="vertical" />
      </div>
    </div>
  );
}
