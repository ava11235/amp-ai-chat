/**
 * ChatPage Component
 *
 * This is a Next.js page component that renders a chat interface for a specific conversation.
 *
 * Key points:
 * 1. It's a default export, meaning it will be the main component rendered for this route.
 * 2. It uses dynamic routing in Next.js to handle different chat IDs.
 * 3. It imports and renders the Chat component, passing the chat ID as a prop.
 *
 * @ param {Object} props - The props passed to the component
 * @ param {Object} props.params - Contains route parameters
 * @ param {string} props.params.id - The ID of the chat, extracted from the URL
 * @ returns {JSX.Element} Renders the Chat component with the specified ID
 */

import { Chat } from "./Chat";

export default function ChatPage({ params }: { params: { id: string } }) {
  return <Chat id={params.id} />;
}
