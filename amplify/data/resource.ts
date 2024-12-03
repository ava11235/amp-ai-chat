/**
 * Amplify Data Resource Configuration
 * 
 * This file defines the data schema and configuration for an AWS Amplify backend application.
 * It sets up two main components: a chat system and a chat naming service, both powered by AI.
 * 
 * Imports:
 * - ClientSchema, a, defineData from @aws-amplify/backend for schema definition and data configuration.
 * 
 * Schema Definition:
 * 1. Chat Model:
 *    - Uses the Claude 3.5 Sonnet AI model for conversations.
 *    - Sets a system prompt for the AI assistant.
 *    - Implements owner-based authorization, allowing only the owner to access their chats.
 * 
 * 2. Chat Namer Model:
 *    - Uses the Claude 3 Haiku AI model for generating chat names.
 *    - Defines a system prompt instructing the AI to create descriptive names (2-10 words).
 *    - Accepts a 'content' string argument.
 *    - Returns a custom type with a 'name' string field.
 *    - Allows access to any authenticated user.
 * 
 * Exports:
 * 1. Schema: TypeScript type definition of the schema for client-side type safety.
 * 2. data: Configured data object for the Amplify backend, using the defined schema.
 *    - Sets the default authorization mode to "userPool" for user authentication.
 * 
 * This configuration enables a chat application where users can have AI-assisted conversations
 * and automatically generate descriptive names for these conversations using a separate AI model.
 */

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: `You are a helpful assistant`,
  })
    .authorization((allow) => allow.owner()),

  chatNamer: a
    .generation({
      aiModel: a.ai.model("Claude 3 Haiku"),
      systemPrompt: `You are a helpful assistant that writes descriptive names for conversations. Names should be 2-10 words long`,
    })
    .arguments({
      content: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
      })
    )
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
