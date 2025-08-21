import { messageMutationResolvers } from "./mutation.js";
import { messageQueryResolvers } from "./query.js";

export const messageModules = {
  Query: messageQueryResolvers,
  Mutations: messageMutationResolvers,
};
