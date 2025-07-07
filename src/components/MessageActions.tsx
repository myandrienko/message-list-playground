import clsx from "clsx";
import { i_delete, i_reply } from "../icons/index.ts";
import { RovingFocusArea, RovingFocusStack } from "../roving";
import { FocusTracker } from "../tracking/FocusTracker";

import styles from "./MessageActions.module.css";

export function MessageActions() {
  return (
    <RovingFocusStack className={styles.root} orientation="horizontal">
      <FocusTracker className={styles.toolbar}>
        <RovingFocusArea defaultFocusable>
          {(tab) => (
            <button type="button" className={styles.button} {...tab("lead")}>
              <Icon icon={i_reply} />
              <div className={styles.label}>Reply</div>
            </button>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <button
              type="button"
              className={clsx(styles.button, styles.button_destructive)}
              {...tab("lead")}
            >
              <Icon icon={i_delete} />
              <div className={styles.label}>Delete</div>
            </button>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <button type="button" className={styles.button} {...tab("lead")}>
              Reaction
            </button>
          )}
        </RovingFocusArea>
      </FocusTracker>
    </RovingFocusStack>
  );
}

function Icon(props: { icon: string }) {
  return (
    <i className={styles.icon} style={{ maskImage: `url("${props.icon}")` }} />
  );
}
