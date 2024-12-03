/**
 * Chat Component
 * 
 * This component implements a chat interface using AWS Amplify's AI Conversation UI.
 * 
 * Key Features:
 * 1. Uses React and AWS Amplify UI components.
 * 2. Implements an AI-powered chat conversation.
 * 3. Supports message sending and rendering.
 * 4. Automatically generates a name for new conversations.
 * 5. Renders messages with Markdown support.
 * 
 * Component Structure:
 * - Utilizes the AIConversation component from AWS Amplify UI.
 * - Integrates with a custom useAIConversation hook for managing conversation state.
 * - Uses ConversationsContext for updating conversation metadata.
 * 
 * Key Functionalities:
 * - Displays chat messages with support for attachments.
 * - Handles sending new messages to the AI.
 * - Automatically generates a name for the conversation on the first message.
 * - Renders message text using ReactMarkdown for formatted display.
 * 
 * Props:
 * - id: string - Unique identifier for the conversation.
 * 
 * State Management:
 * - Uses React context (ConversationsContext) for managing conversations.
 * - Leverages useAIConversation hook for conversation data and message sending.
 * 
 * UI Components:
 * - Wrapped in an Amplify UI View component for layout.
 * - Uses AIConversation for the main chat interface.
 * 
 * Note: This component is marked with "use client", indicating it's designed 
 * for client-side rendering in a Next.js application.
 */


"use client";
import * as React from "react";
import { AIConversation } from "@aws-amplify/ui-react-ai";
import { View } from "@aws-amplify/ui-react";
import { client, useAIConversation } from "@/client";
import { ConversationsContext } from "@/providers/ConversationsProvider";
import ReactMarkdown from "react-markdown";

export const Chat = ({ id }: { id: string }) => {
  const { updateConversation } = React.useContext(ConversationsContext);
  const [
    {
      data: { messages, conversation },
      isLoading,
    },
    sendMessage,
  ] = useAIConversation("chat", { id });

  return (
    <View padding="large" flex="1">
      <AIConversation
        allowAttachments
        messages={messages}
        handleSendMessage={(message) => {
          sendMessage(message);
          // only run this on the first message...
          if (!conversation?.name) {
            client.generations
              .chatNamer({
                content: message.content.map((c) => c.text ?? "").join(""),
              })
              .then((res) => {
                updateConversation({
                  id,
                  name: res.data?.name ?? "",
                });
              });
          }
        }}
        isLoading={isLoading}
        messageRenderer={{
          text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
        }}
      />
    </View>
  );
};
