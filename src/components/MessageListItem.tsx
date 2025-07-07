import type { Message } from "../data/messages";
import { getUserPresenceStatus } from "../data/users";
import { useTabIndex } from "../roving";
import { MessageActions } from "./MessageActions";
import { Userpic } from "./Userpic";

import styles from "./MessageListItem.module.css";

export interface MessageListItemProps {
  message: Message;
  includeHeader?: boolean;
}

export function MessageListItem(props: MessageListItemProps) {
  const tab = useTabIndex();

  const timestamp = new Date(props.message.timestamp);
  const formattedTimestamp = timestamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={styles.root} {...tab("lead")}>
      {props.includeHeader && (
        <div className={styles.header}>
          <div className={styles.userpic}>
            <Userpic
              user={props.message.user}
              status={getUserPresenceStatus(props.message.user.id)}
            />
          </div>
          <div className={styles.author}>{props.message.user.name}</div>
          <time className={styles.timestamp} dateTime={props.message.timestamp}>
            {formattedTimestamp}
          </time>
        </div>
      )}
      <div className={styles.body}>{props.message.body}</div>
      <div className={styles.actions}>
        <MessageActions />
      </div>
    </div>
  );
}
