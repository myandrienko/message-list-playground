import type { ReactNode } from "react";
import type { User } from "./users";
import { Link } from "../components/Link";

import linkCardStyles from "../components/LinkCard.module.css";

export interface Message {
  user: User;
  body: ReactNode;
  timestamp: string;
}

export const messages: Message[] = [
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Damn! I'm late for school!",
    timestamp: "1985-10-25T08:01:28Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Precisely.",
    timestamp: "1985-10-25T08:01:25Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Wait a minute. Wait a minute, Doc. Are you tellin’ me that it's 8:25?",
    timestamp: "1985-10-25T08:01:22Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "They're late. My experiment worked. They're all exactly twenty-five minutes slow.",
    timestamp: "1985-10-25T08:01:16Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Yeah, it's 8:00.",
    timestamp: "1985-10-25T08:01:13Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Are those my clocks I hear?",
    timestamp: "1985-10-25T08:01:10Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Right.",
    timestamp: "1985-10-25T08:01:06Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Good, I'll see you tonight. Don't forget, now, 1:15 a.m., Twin Pines Mall.",
    timestamp: "1985-10-25T08:01:02Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Yeah, I'll keep that in mind.",
    timestamp: "1985-10-25T08:00:59Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "My equipment, that reminds me, Marty, you better not hook up to the amplifier. There's a slight possibility for overload.",
    timestamp: "1985-10-25T08:00:53Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "You know, Doc, you left your equipment on all week.",
    timestamp: "1985-10-25T08:00:49Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Yeah, he's right here.",
    timestamp: "1985-10-25T08:00:46Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Where's Einstein, is he with you?",
    timestamp: "1985-10-25T08:00:43Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Working.",
    timestamp: "1985-10-25T08:00:40Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "What's goin' on? Where have you been all week?",
    timestamp: "1985-10-25T08:00:37Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Yes.",
    timestamp: "1985-10-25T08:00:35Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Wait a minute, wait a minute. 1:15 in the morning?",
    timestamp: "1985-10-25T08:00:32Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: (
      <>
        Thank God I found you. Listen, can you meet me at{" "}
        <Link href="https://maps.app.goo.gl/j4cAH7H95C8zP8iC7">
          Twin Pines Mall
        </Link>{" "}
        tonight at 1:15? I've made a major breakthrough; I'll need your
        assistance.
        <Link
          className={linkCardStyles.root}
          href="https://maps.app.goo.gl/j4cAH7H95C8zP8iC7"
        >
          <div className={linkCardStyles.header}>
            Twin Pines Mall - Google Maps
          </div>
          <div className={linkCardStyles.link}>
            https://maps.app.goo.gl/j4cAH7H95C8zP8iC7
          </div>
          <div className={linkCardStyles.description}>
            Unnamed Road, City of Industry, CA 91745, United States.
          </div>
        </Link>
      </>
    ),
    timestamp: "1985-10-25T08:00:25Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Hey, hey, Doc, where are you?",
    timestamp: "1985-10-25T08:00:20Z",
  },
  {
    user: { id: "doc_brown", name: "Doc" },
    body: "Marty, is that you?",
    timestamp: "1985-10-25T08:00:17Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Yo.",
    timestamp: "1985-10-25T08:00:15Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Rock and roll.",
    timestamp: "1985-10-25T08:00:10Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Whoa.",
    timestamp: "1985-10-25T08:00:05Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "aw, God. Aw, Jesus. That's disgusting.",
    timestamp: "1985-10-25T07:59:20Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Doc. Hello, anybody home? Einstein, come here, boy. What's goin’ on? Wha-",
    timestamp: "1985-10-25T07:59:10Z",
  },
  {
    user: { id: "marty_mcfly", name: "Marty" },
    body: "Hey, Doc?",
    timestamp: "1985-10-25T07:59:00Z",
  },
];
