import { RovingFocusArea, RovingFocusStack } from "./roving";

export function App() {
  return (
    <>
      <button type="button">Before</button>
      <RovingFocusStack orientation="vertical">
        <RovingFocusArea defaultFocusable>
          {(tab) => (
            <div {...tab("lead")}>
              Message{" "}
              <RovingFocusStack orientation="horizontal">
                <RovingFocusArea defaultFocusable>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 1
                    </button>
                  )}
                </RovingFocusArea>
                <RovingFocusArea>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 2
                    </button>
                  )}
                </RovingFocusArea>
                <RovingFocusArea>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 3
                    </button>
                  )}
                </RovingFocusArea>
              </RovingFocusStack>
            </div>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <div {...tab("lead")}>
              Message{" "}
              <RovingFocusStack orientation="horizontal">
                <RovingFocusArea defaultFocusable>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 1
                    </button>
                  )}
                </RovingFocusArea>
                <RovingFocusArea>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 2
                    </button>
                  )}
                </RovingFocusArea>
                <RovingFocusArea>
                  {(tab) => (
                    <button type="button" {...tab("lead")}>
                      Action 3
                    </button>
                  )}
                </RovingFocusArea>
              </RovingFocusStack>
            </div>
          )}
        </RovingFocusArea>
        <RovingFocusArea>
          {(tab) => (
            <div {...tab("lead")}>
              Message{" "}
              <button type="button" {...tab}>
                Action
              </button>
            </div>
          )}
        </RovingFocusArea>
      </RovingFocusStack>
      <button type="button">After</button>
    </>
  );
}
