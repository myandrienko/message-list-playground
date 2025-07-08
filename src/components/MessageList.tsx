import { useMemo, useState } from "react";
import type { Message } from "../data/messages";
import { RovingFocusArea, RovingFocusStack } from "../roving";
import { FocusTracker } from "../tracking/FocusTracker";
import { MessageListItem } from "./MessageListItem";

import styles from "./MessageList.module.css";
import { isMobile } from "../mobile";
import { MessageMenu } from "./MessageMenu";

interface MessageListProps {
  messages: Message[];
}

export function MessageList(props: MessageListProps) {
  const conversations = useMemo(
    () => groupConversations(props.messages),
    [props.messages]
  );

  const [expandedMessage, setExpandedMessage] = useState<Message | null>(null);

  const handleClick = (message: Message) => {
    if (isMobile()) {
      setExpandedMessage(message);
    }
  };

  return (
    <RovingFocusStack className={styles.root} orientation="vertical-reverse">
      <FocusTracker as="ul" className={styles.conversations}>
        {conversations.map((conversation, conversationIndex) => (
          <li key={conversationIndex} className={styles.conversation}>
            <ul className={styles.messages}>
              {conversation.map((message, messageIndex) => {
                const isOldestInConversation =
                  messageIndex === conversation.length - 1;
                const isNewest = messageIndex === 0 && conversationIndex === 0;

                return (
                  <RovingFocusArea
                    key={messageIndex}
                    defaultFocusable={isNewest}
                  >
                    <li
                      className={styles.message}
                      onPointerDown={() => handleClick(message)}
                    >
                      <MessageListItem
                        message={message}
                        includeHeader={isOldestInConversation}
                      />
                    </li>
                  </RovingFocusArea>
                );
              })}
            </ul>
          </li>
        ))}
      </FocusTracker>
      {expandedMessage && (
        <div
          className={styles.overlay}
          onPointerDown={() => setExpandedMessage(null)}
        >
          <MessageMenu message={expandedMessage} />
        </div>
      )}
    </RovingFocusStack>
  );
}

function groupConversations(messages: Message[]) {
  const conversations: Message[][] = [];

  for (const message of messages) {
    let currentConversation = conversations.at(-1);

    if (currentConversation?.at(0)?.user.id !== message.user.id) {
      currentConversation = [];
      conversations.push(currentConversation);
    }

    currentConversation.push(message);
  }

  return conversations;
}
