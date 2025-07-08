import clsx from "clsx";
import {
  a_heart,
  a_lol,
  a_thumbsup,
  i_delete,
  i_reply,
} from "../icons/index.ts";
import { RovingFocusArea, RovingFocusStack } from "../roving";
import { FocusTracker } from "../tracking/FocusTracker";
import { Button } from "./Button.tsx";
import { Icon } from "./Icon.tsx";
import { ReactionButton } from "./ReactionButton.tsx";

import styles from "./MessageActions.module.css";

export interface MessageActionsProps {
  orientation: "horizontal" | "vertical";
}

export function MessageActions(props: MessageActionsProps) {
  return (
    <RovingFocusStack className={styles.root} orientation={props.orientation}>
      <FocusTracker
        className={clsx(styles.toolbar, {
          [styles.toolbar_horizontal]: props.orientation === "horizontal",
          [styles.toolbar_vertical]: props.orientation === "vertical",
        })}
        role="toolbar"
        aria-orientation={props.orientation}
      >
        <RovingFocusArea defaultFocusable>
          {(tab) => (
            <Button {...tab("lead")}>
              <Icon icon={i_reply} />
              Reply
            </Button>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <Button destructive {...tab("lead")}>
              <Icon icon={i_delete} />
              Delete
            </Button>
          )}
        </RovingFocusArea>
        <div className={styles.reactions}>
          <RovingFocusArea>
            {(tab) => (
              <ReactionButton
                animation={a_thumbsup}
                {...tab("lead")}
                aria-label="React with Thumbs Up"
              />
            )}
          </RovingFocusArea>
          <RovingFocusArea>
            {(tab) => (
              <ReactionButton
                animation={a_heart}
                {...tab("lead")}
                aria-label="React with Heart"
              />
            )}
          </RovingFocusArea>
          <RovingFocusArea>
            {(tab) => (
              <ReactionButton
                animation={a_lol}
                {...tab("lead")}
                aria-label="React with LOL"
              />
            )}
          </RovingFocusArea>
        </div>
      </FocusTracker>
    </RovingFocusStack>
  );
}
