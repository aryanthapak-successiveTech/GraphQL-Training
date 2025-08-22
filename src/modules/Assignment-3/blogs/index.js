import { postMutationResolvers, userMutationsResolvers } from "./mutation.js";
import { postQueryResolvers, userQueryResolvers } from "./query.js";
import { commentSubscriptionResolvers, messageSubscriptionResolvers } from "./subscription.js";

export const blogModules={
    Query:{...userQueryResolvers,...postQueryResolvers},
    Mutations:{...userMutationsResolvers,...postMutationResolvers},
    Subscriptions:{...commentSubscriptionResolvers,...messageSubscriptionResolvers}
}