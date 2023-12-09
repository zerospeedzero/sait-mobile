import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import * as timeago from "timeago.js";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { supabaseBrowserClient } from "utils/supabaseBrowser";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const updateChatbotMessage = (
  conversation,
  message
) => {
  const interactionId = message.interactionId;

  const updatedConversation = conversation.reduce(
    (acc, e) => [
      ...acc,
      e.id === interactionId ? { ...e, message: e.message + message.token } : e,
    ],
    []
  );

  return conversation.some((e) => e.id === interactionId)
    ? updatedConversation
    : [
        ...updatedConversation,
        {
          id: interactionId,
          message: message.token,
          speaker: "bot",
          date: new Date(),
        },
      ];
};

export default function Home() {
  const [text, setText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [botIsTyping, setBotIsTyping] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Waiting for query...");
  const [userId, setUserId] = useState();

  useEffect(() => {
    supabaseBrowserClient.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        supabaseBrowserClient.auth.onAuthStateChange((_e, newSession) =>
          setUserId(newSession?.user.id)
        );
      } else {
        setUserId(session?.user.id);
      }
    });
  }, []);

  if (!userId)
    return (
      <Auth
        supabaseClient={supabaseBrowserClient}
        appearance={{ theme: ThemeSupa }}
      />
    );

  const channel = supabaseBrowserClient.channel(userId);

  channel
    .on("broadcast", { event: "chat" }, ({ payload }) => {
      switch (payload.event) {
        case "response":
          setConversation((state) => updateChatbotMessage(state, payload));
          break;
        case "status":
          setStatusMessage(payload.message);
          break;
        case "responseEnd":
        default:
          setBotIsTyping(false);
          setStatusMessage("Waiting for query...");
      }
    })
    .subscribe();

  const submit = async () => {
    setConversation((state) => [
      ...state,
      {
        message: text,
        speaker: "user",
        date: new Date(),
      },
    ]);
    try {
      setBotIsTyping(true);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      });

      await response.json();
    } catch (error) {
      console.error("Error submitting message:", error);
    }
    setText("");
  };

  return (
    <>
      <div className="w-full h-[20rem] p-12 rounded-lg">
        <div
          style={{ position: "relative", height: "80vh", overflow: "hidden" }}
        >
          <MainContainer>
            <ChatContainer>
              <ConversationHeader>
                <ConversationHeader.Actions></ConversationHeader.Actions>
                <ConversationHeader.Content
                  userName="Chat with SAIT mobile"
                  info={statusMessage}
                />
              </ConversationHeader>

              <MessageList
                typingIndicator={
                  botIsTyping ? (
                    <TypingIndicator content="SAIT mobile is typing" />
                  ) : null
                }
              >
                {conversation.map((entry, index) => {
                  return (
                    <Message
                      key={index}
                      style={{ width: "80%" }}
                      model={{
                        type: "custom",
                        sender: entry.speaker,
                        position: "single",
                        direction:
                          entry.speaker === "bot" ? "incoming" : "outgoing",
                      }}
                    >
                      <Message.CustomContent>
                        <ReactMarkdown
                          remarkPlugins={[remarkMath, rehypeKatex]}
                        >
                          {entry.message}
                        </ReactMarkdown>
                      </Message.CustomContent>
                      <Message.Footer
                        sentTime={timeago.format(entry.date)}
                        sender={entry.speaker === "bot" ? "SAIT mobile" : "You"}
                      />
                    </Message>
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={submit}
                onChange={(e, text) => {
                  setText(text);
                }}
                sendButton={true}
                autoFocus
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}
