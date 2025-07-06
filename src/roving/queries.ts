export function focusFirstArea(stackId: string) {
  queryAreas(stackId).at(0)?.lead.focus();
}

export function focusLastArea(stackId: string) {
  queryAreas(stackId).at(-1)?.lead.focus();
}

export function focusNextArea(
  stackId: string,
  el: HTMLElement,
  dir: -1 | 1 = 1
) {
  const currAreaId = closestArea(stackId, el);
  const areas = queryAreas(stackId);
  const currIndex = areas.findIndex(({ areaId }) => areaId === currAreaId);
  areas.at(Math.max(currIndex + dir, 0))?.lead.focus();
}

export function focusParentArea(stackId: string, el: HTMLElement): boolean {
  const { stackId: targetStackId } = parseAttr(el);
  const areaId = closestArea(stackId, el);

  if (stackId === targetStackId || !areaId) {
    return false;
  }

  document
    .querySelector<HTMLElement>(`[data-focusable="${stackId}/${areaId}/lead"]`)
    ?.focus();
  return true;
}

type RovingFocusAreaList = Array<{
  areaId: string;
  lead: HTMLElement;
}>;

function queryAreas(stackId: string): RovingFocusAreaList {
  const areas: RovingFocusAreaList = [];
  let area: { areaId: string; lead?: HTMLElement } | undefined;
  const commit = () => {
    if (area) {
      if (!area.lead) {
        throw new Error(
          `Area ${area?.areaId} is missing lead focusable element`
        );
      }

      areas.push({ ...area, lead: area.lead });
    }
  };

  for (const el of Array.from(
    document.querySelectorAll<HTMLElement>(`[data-focusable^="${stackId}"]`)
  )) {
    const { areaId, isLead } = parseAttr(el);

    if (areaId !== area?.areaId) {
      commit();
      area = { areaId: areaId };
    }

    if (isLead) {
      area.lead = el;
    }
  }

  commit();
  return areas;
}

export function closestArea(stackId: string, el: HTMLElement): string | null {
  const closest = el.closest<HTMLElement>(`[data-focusable^="${stackId}"]`);

  if (!closest) {
    return null;
  }

  const { areaId } = parseAttr(closest);
  return areaId;
}

function parseAttr(el: HTMLElement): {
  stackId: string;
  areaId: string;
  isLead: boolean;
  isStack: boolean;
} {
  const attr = el.dataset.focusable;

  if (!attr) {
    throw new Error("Unexpected focusable element in RovingFocusArea");
  }

  const [stackId, areaId, maybeLead] = attr.split("/");
  return {
    stackId,
    areaId,
    isLead: maybeLead === "lead",
    isStack: !!el.dataset.stack,
  };
}
