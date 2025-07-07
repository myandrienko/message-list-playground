import {
  useState,
  type CSSProperties,
  type FocusEvent,
  type PropsWithChildren,
} from "react";
import styles from "./FocusTracker.module.css";
import { nanoid } from "nanoid";

interface FocusRingAnimationParams {
  key: string;
  from: DOMRect;
  to: DOMRect;
}

export function FocusTracker(props: PropsWithChildren) {
  const [animationParams, setAnimationParams] =
    useState<FocusRingAnimationParams | null>(null);

  const handleFocus = (event: FocusEvent) => {
    if (event.target && event.relatedTarget) {
      const rectFrom = event.relatedTarget.getBoundingClientRect();
      const rectTo = event.target.getBoundingClientRect();
      setAnimationParams({ key: nanoid(), from: rectFrom, to: rectTo });
    } else {
      setAnimationParams(null);
    }
  };

  return (
    <div
      style={
        animationParams
          ? {
              ...rectToCustomCssProps("focus-ring-from", animationParams.from),
              ...rectToCustomCssProps("focus-ring-to", animationParams.to),
            }
          : undefined
      }
      onFocus={handleFocus}
    >
      {props.children}
      {animationParams && (
        <i
          key={animationParams.key}
          className={styles.ring}
          onAnimationEnd={() => setAnimationParams(null)}
        />
      )}
    </div>
  );
}

function rectToCustomCssProps(prefix: string, rect: DOMRect) {
  return {
    [`--${prefix}-x`]: `${rect.x}`,
    [`--${prefix}-y`]: `${rect.y}`,
    [`--${prefix}-width`]: `${rect.width}`,
    [`--${prefix}-height`]: `${rect.height}`,
  } as CSSProperties;
}
