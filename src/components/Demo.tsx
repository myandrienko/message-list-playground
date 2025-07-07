import { messages } from "../data/messages";
import { MessageList } from "./MessageList";

import styles from "./Demo.module.css";

export function Demo() {
  return (
    <div className={styles.root}>
      <MessageList messages={messages} />
    </div>
  );
}
