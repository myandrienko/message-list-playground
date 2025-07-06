import {
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type PropsWithChildren,
} from "react";
import {
  RovingFocusAreaContext,
  RovingFocusStackContext,
  type RovingFocusStackContextValue,
} from "./context";
import {
  closestArea,
  focusFirstArea,
  focusLastArea,
  focusNextArea,
  focusParentArea,
} from "./queries";
import { debug } from "./debug";

export interface RovingFocusStackProps {
  orientation: RovingFocusStackOrientation;
}

export type RovingFocusStackOrientation =
  | "horizontal"
  | "vertical"
  | "horizontal-reverse"
  | "vertical-reverse";

export function RovingFocusStack(
  props: PropsWithChildren<RovingFocusStackProps>
) {
  const stackId = useId();
  const parent = use(RovingFocusAreaContext);
  const [focusedAreaId, setFocusedAreaId] = useState<string | null>(null);

  const contextValue = useMemo<RovingFocusStackContextValue>(
    () => ({ stackId, focusedAreaId }),
    [focusedAreaId, stackId]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      setFocusedAreaId(closestArea(stackId, event.target));
    },
    [stackId]
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setFocusedAreaId(
        event.relatedTarget instanceof HTMLElement
          ? closestArea(stackId, event.relatedTarget)
          : null
      );
    },
    [stackId]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const keys = getDirectionalKeys(props.orientation);

      if (event.target instanceof HTMLElement) {
        let handled = true;

        switch (event.key) {
          case keys.focusFirstKey:
            focusFirstArea(stackId);
            break;

          case keys.focusLastKey:
            focusLastArea(stackId);
            break;

          case keys.focusNextKey:
            focusNextArea(stackId, event.target, +1);
            break;

          case keys.focusPrevKey:
            focusNextArea(stackId, event.target, -1);
            break;

          case keys.focusParentKey:
            handled = focusParentArea(stackId, event.target);
            break;

          default:
            handled = false;
            break;
        }

        if (handled) {
          event.stopPropagation();
        }
      }
    },
    [props.orientation, stackId]
  );

  return (
    <div
      data-focusable={parent.fullAreaId}
      data-stack={stackId}
      style={
        debug
          ? {
              padding: "10px",
              border: "1px solid lightgray",
              borderRadius: "5px",
            }
          : undefined
      }
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {debug && (
        <pre>
          stack {stackId}, focused area {focusedAreaId ?? "none"}
        </pre>
      )}
      <RovingFocusStackContext value={contextValue}>
        {props.children}
      </RovingFocusStackContext>
    </div>
  );
}

function getDirectionalKeys(orientation: RovingFocusStackOrientation) {
  const isHorizontal =
    orientation === "horizontal" || orientation === "horizontal-reverse";
  const isForwards = orientation === "horizontal" || orientation === "vertical";

  return {
    focusFirstKey: isForwards ? "Home" : "End",
    focusLastKey: isForwards ? "End" : "Home",
    focusNextKey: isForwards
      ? isHorizontal
        ? "ArrowRight"
        : "ArrowDown"
      : isHorizontal
      ? "ArrowLeft"
      : "ArrowUp",
    focusPrevKey: isForwards
      ? isHorizontal
        ? "ArrowLeft"
        : "ArrowUp"
      : isHorizontal
      ? "ArrowRight"
      : "ArrowDown",
    focusParentKey: "Escape",
  };
}
