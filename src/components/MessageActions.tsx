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
              Reply
            </button>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <button type="button" className={styles.button} {...tab("lead")}>
              Delete
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
