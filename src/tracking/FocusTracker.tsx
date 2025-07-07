import {
  useState,
  type ComponentProps,
  type CSSProperties,
  type ElementType,
  type FocusEvent,
  type PropsWithChildren,
} from "react";
import styles from "./FocusTracker.module.css";
import { nanoid } from "nanoid";
import clsx from "clsx";

export type FocusTrackerProps<T extends ElementType = "div"> = {
  as?: T;
} & ComponentProps<T>;

interface FocusRingAnimationParams {
  key: string;
  from: Rect;
  to: Rect;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function FocusTracker<T extends ElementType = "div">(
  props: PropsWithChildren<FocusTrackerProps<T>>
) {
  const { as, ...rest } = props;
  const [animationParams, setAnimationParams] =
    useState<FocusRingAnimationParams | null>(null);

  const handleFocus = (event: FocusEvent) => {
    const from = event.relatedTarget;
    const to = event.target;

    if (
      from?.closest("[data-focus-tracker]") !== event.currentTarget ||
      to?.closest("[data-focus-tracker]") !== event.currentTarget
    ) {
      return;
    }

    if (
      event.target instanceof HTMLElement &&
      event.relatedTarget instanceof HTMLElement
    ) {
      const rectFrom = getRect(event.relatedTarget);
      const rectTo = getRect(event.target);
      setAnimationParams({ key: nanoid(), from: rectFrom, to: rectTo });
    } else {
      setAnimationParams(null);
    }
  };

  const Component = as ?? "div";

  return (
    <Component
      {...rest}
      className={clsx(styles.root, rest.className)}
      style={
        animationParams
          ? {
              ...rest.style,
              ...rectToCustomCssProps("focus-ring-from", animationParams.from),
              ...rectToCustomCssProps("focus-ring-to", animationParams.to),
            }
          : rest.style
      }
      onFocus={handleFocus}
      data-focus-tracker=""
    >
      {props.children}
      {animationParams && (
        <i
          key={animationParams.key}
          className={styles.ring}
          onAnimationEnd={() => setAnimationParams(null)}
        />
      )}
    </Component>
  );
}

function getRect(el: HTMLElement) {
  return {
    x: el.offsetLeft,
    y: el.offsetTop,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

function rectToCustomCssProps(prefix: string, rect: Rect) {
  return {
    [`--${prefix}-x`]: `${rect.x}`,
    [`--${prefix}-y`]: `${rect.y}`,
    [`--${prefix}-width`]: `${rect.width}`,
    [`--${prefix}-height`]: `${rect.height}`,
  } as CSSProperties;
}
