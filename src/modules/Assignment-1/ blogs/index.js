import { postMutationResolvers, userMutationsResolvers } from "./mutation.js";
import { postQueryResolvers, userQueryResolvers } from "./query.js";

export const blogModules={
    Query:{...userQueryResolvers,...postQueryResolvers},
    Mutations:{...userMutationsResolvers,...postMutationResolvers}
}