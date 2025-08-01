import {
  use,
  useCallback,
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type ElementType,
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

export type RovingFocusStackProps<T extends ElementType = "div"> = {
  as?: T;
  orientation: RovingFocusStackOrientation;
} & Omit<ComponentProps<T>, "as" | "orientation">;

export type RovingFocusStackOrientation =
  | "horizontal"
  | "vertical"
  | "horizontal-reverse"
  | "vertical-reverse";

export function RovingFocusStack<T extends ElementType = "div">(
  props: PropsWithChildren<RovingFocusStackProps<T>>
) {
  const { as, orientation, ...rest } = props;
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
      const dir = event.currentTarget.matches(":dir(rtl)") ? "rtl" : "ltr";
      const keys = getDirectionalKeys(orientation, dir);

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
          event.preventDefault();
        }
      }
    },
    [orientation, stackId]
  );

  const Component = as ?? "div";

  return (
    <Component
      {...rest}
      data-focusable={parent.fullAreaId}
      data-stack={stackId}
      style={
        debug
          ? {
              ...rest.style,
              padding: "10px",
              border: "1px solid lightgray",
              borderRadius: "5px",
            }
          : rest.style
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
    </Component>
  );
}

function getDirectionalKeys(
  orientation: RovingFocusStackOrientation,
  dir: "rtl" | "ltr"
) {
  const isHorizontal =
    orientation === "horizontal" || orientation === "horizontal-reverse";
  const isForwards =
    orientation === (dir === "rtl" ? "horizontal-reverse" : "horizontal") ||
    orientation === "vertical";

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
