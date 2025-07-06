import { use, useId, useMemo, type ReactNode } from "react";
import {
  RovingFocusAreaContext,
  RovingFocusStackContext,
  type RovingFocusAreaContextValue,
} from "./context";
import { debug } from "./debug";
import { getTabIndex, type TabIndex } from "./tabIndex";

export interface RovingFocusAreaProps {
  defaultFocusable?: boolean;
  children?: ReactNode | ((tabIndexProps: TabIndex) => ReactNode);
}

export function RovingFocusArea(props: RovingFocusAreaProps) {
  const areaId = useId();
  const stack = use(RovingFocusStackContext);

  if (!stack) {
    throw new Error(
      "Cannot render RovingFocusArea outside of RovingFocusStack"
    );
  }

  const parent = use(RovingFocusAreaContext);
  const isFocused = areaId === stack.focusedAreaId;
  const isFocusable =
    parent.isFocused &&
    (stack.focusedAreaId ? isFocused : props.defaultFocusable ?? false);
  const contextValue = useMemo<RovingFocusAreaContextValue>(
    () => ({
      fullAreaId: `${stack.stackId}/${areaId}`,
      isFocused: isFocused,
      isFocusable: isFocusable,
    }),
    [areaId, isFocusable, isFocused, stack.stackId]
  );

  return (
    <RovingFocusAreaContext value={contextValue}>
      {debug && (
        <pre style={{ display: "inline-block" }}>
          area ${areaId}
          <br />
          focused: {isFocused ? "y" : "n"}
          <br />
          focusable: {isFocusable ? "y" : "n"}
        </pre>
      )}
      {typeof props.children === "function"
        ? props.children(getTabIndex(contextValue))
        : props.children}
    </RovingFocusAreaContext>
  );
}
