import Lottie from "lottie-react";
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

import styles from "./MessageActions.module.css";
import { ReactionButton } from "./ReactionButton.tsx";

export function MessageActions() {
  return (
    <RovingFocusStack className={styles.root} orientation="horizontal">
      <FocusTracker className={styles.toolbar}>
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
        <RovingFocusArea>
          {(tab) => <ReactionButton animation={a_thumbsup} {...tab("lead")} />}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => <ReactionButton animation={a_heart} {...tab("lead")} />}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => <ReactionButton animation={a_lol} {...tab("lead")} />}
        </RovingFocusArea>
      </FocusTracker>
    </RovingFocusStack>
  );
}

function Reaction(props: { animation: object }) {
  return (
    <Lottie
      animationData={props.animation}
      style={{ width: "24px", height: "24px" }}
      autoplay={true}
      loop={1}
    />
  );
}
