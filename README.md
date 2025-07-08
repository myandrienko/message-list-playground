# Experiments for Chat Message List Component

Chat message lists are tricky. To me, four key points when implementing message
lists are:

1. Message lists are "upside down" in terms of the regular page flow. The latest
   messages at the bottom of the list are the ones we want to see first.
2. Since chatting is mostly typing, making chat features accessible with
   keyboard can save the user a lot of input switching.
3. Message lists can be very long, so it's not acceptable if the user has to
   "tab" through all the messages to move focus through the message list.
4. Messages themselves can have arbitrary content, including RTL scripts.

## Starting the List at the Bottom

To show the latest messages at the bottom of the list first, you don't need any
scripting. Instead, here's the trick I came up with:

1. Render messages in reverse chronological order.
2. Wrap them in a flex container with `flex-direction: column-reverse`.
3. Add `overflow: scroll` to the container.

That way, all browsers will render the component scrolled to the bottom by
default.

> **Try it out:** Refreshing the page should always reset the message list to be
> scrolled to bottom.

## Avoiding the Disco Floor Effect

One of my pet peeves is that some web application use too much hover effects.

In Slack, just moving your mouse through the message list causes a lot of
distracting things to happen: messages change their backgrounds, toolbars appear
and disappear, mouse pointer alternates between arrow, hand and I-beam, etc.

In my opinion, this is not acceptable for desktop-class applications.

This message list implements a tiny delay before applying hover effects to the
message. The delay is small enough so that it doesn't meaningfully slow down
interactions, but it's very effective at preventing intermediate hover effects.

> **Try it out:** Quickly move the mouse over the message list. You should see
> no hover effects at all. Then hold the mouse over one of the messages. You
> should see the message toolbar appear.

I also use the default arrow mouse pointer for all controls except for links for
a more desktop-like experience.

## Touch Devices Support

Touch devices cannot rely on hover effects at all. (Some browsers simulate hover
when an element is pressed and held, but this is not a very comfortable
interaction.)

For touch devices, this component implements a separate experience: tapping a
message reveals its context menu.

AFAIK, detecting touch capabilities from browser is not trivial, so for the
purposes of this demo I just assume any device with a narrow viewport is a touch
device.

> **Try it out:** Open the demo on your phone, or enable phone simulation in
> developer tools. Hover effects should disappear. Tapping a message reveals its
> context menu.

## Keyboard Accessibilty

This component implements _roving focus_ for keyboard navigation. When tabbing
into the list, only one message and its content is focusable. The focus can be
moved to neighboring messages with arrow keys, <kbd>Home</kbd> and
<kbd>End</kbd> also work.

This is similar to the Grid ARIA pattern, but the difference is that message
content is not laid out in any particular order, so we prefer <kbd>Tab</kbd>
navigation to arrow keys.

Roving focus is usually implemented by listening for `focus` events globally and
trapping focus to a particular area of the page. This approach interferes with
the browser's native focus behavior, and can have unwanted consequences. (One
example is React Aria Components, where you cannot tab into browser UI when
there is a modal on the page.)

I solve the same problem by having a centralized focus manager that can switch
the `tabIndex` attribute for a particular page area between `0` and `-1`. This
works very reliably.

> **Try it out:** Tabbing into the list focuses the latest message. Tabbing
> again moves focus inside the message. Vertical arrow keys navigate the message
> list. When the toolbar is focused, horizontal arrow keys navigate the toolbar,
> and <kbd>Esc</kbd> returns focus to the message. <kbd>Home</kbd> and
> <kbd>End</kbd> keys also work.

Note that the focus ring is only visible when actually using keyboard to
navigate.

## Dark Mode

Base colors used in this demo are stored as OKLCH colors in custom CSS
properties. Most components use CSS relative colors to build on top of the base
colors, so less custom properties are required.

That made implementing dark mode easy: I just needed to override the five base
colors.

> **Try it out:** Switch to dark mode, or enable emulation in developer tools.

## Animations

This component is strictly practical, so the animations should be subtle:

1. Hover effects have a very slight fade-in and out.
2. Focus ring moves immediately, but has a "ghost" tail when moving between
   messages or toolbar items. This helps with tracking focus visually.
3. Reaction emojis are animated, but only play their animation once or when
   hovered or focused.

## RTL

This component is fully ready for RTL scripts. It uses logical CSS properties,
and the roving focus implementation also takes script direction into account.

> **Try it out:** Add `dir="rtl"` to the page root.
