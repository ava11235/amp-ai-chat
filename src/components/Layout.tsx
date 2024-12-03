/**
 * Layout Component
 *
 * This component serves as the main layout wrapper for the application. It provides
 * authentication, conversation context, and a basic layout structure.
 *
 * Key Features:
 * 1. Client-Side Rendering: Marked with "use client" for Next.js client-side execution.
 * 2. Authentication: Wraps the entire application in an Authenticator component.
 * 3. Conversation Management: Provides a ConversationsProvider for state management.
 * 4. Responsive Layout: Uses a full-viewport Flex container for layout.
 *
 * Component Structure:
 * - Authenticator (from AWS Amplify UI)
 *   - ConversationsProvider (custom context provider)
 *     - Flex container (full viewport)
 *       - Rendered children
 *
 * Props:
 * - children: React.PropsWithChildren - Child components to be rendered within the layout.
 *
 * Usage:
 * This component is typically used as a top-level wrapper in a Next.js application,
 * providing consistent authentication and layout across multiple pages or routes.
 *
 * Dependencies:
 * - React
 * - @aws-amplify/ui-react for Authenticator and Flex components
 * - Custom ConversationsProvider for managing conversation state
 *
 * Note: The "use client" directive indicates that this component and its children
 * will be rendered on the client side in a Next.js application using the App Router.
 */

"use client";
import * as React from "react";
import { Authenticator, Flex } from "@aws-amplify/ui-react";
import { ConversationsProvider } from "@/providers/ConversationsProvider";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <Authenticator>
      <ConversationsProvider>
        <Flex direction="row" width="100vw" height="100vh" overflow="hidden">
          {children}
        </Flex>
      </ConversationsProvider>
    </Authenticator>
  );
};
