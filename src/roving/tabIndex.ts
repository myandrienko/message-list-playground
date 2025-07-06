import { use } from "react";
import {
  RovingFocusAreaContext,
  type RovingFocusAreaContextValue,
} from "./context";

export interface TabIndex extends TabIndexProps {
  (lead: "lead"): TabIndexProps;
}

export interface TabIndexProps {
  tabIndex: 0 | -1;
  "data-focusable": string;
}

export function useTabIndex(): TabIndex {
  const area = use(RovingFocusAreaContext);
  return getTabIndex(area);
}

export function getTabIndex(area: RovingFocusAreaContextValue): TabIndex {
  function tabIndex(lead: "lead"): TabIndexProps {
    if (lead !== "lead") {
      throw new Error(
        'Invalid tabIndex use: should be `{...tabIndex}` or `{...tabIndex("lead")}`'
      );
    }

    return {
      tabIndex: area.isFocusable ? (0 as const) : (-1 as const),
      "data-focusable": `${area.fullAreaId}/lead`,
    };
  }

  tabIndex.tabIndex = area.isFocused ? (0 as const) : (-1 as const);
  tabIndex["data-focusable"] = area.fullAreaId;

  return tabIndex;
}
