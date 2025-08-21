import { messages } from "./dataSource.js";

export const messageMutationResolvers = {
  sendMessage: (_, { content, author,recipient }) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      author,
      recipient,
      createdAt: new Date().toISOString(),
    };
    messages.push(newMessage);
    return newMessage;
  },
};
