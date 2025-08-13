import { blogModules } from "../modules/Assignment-1/ blogs/index.js";
import { messageModules } from "../modules/Assignment-1/message/index.js";


export const resolvers={
    Query:{
        ...messageModules.Query,...blogModules.Query
    },
    Mutation:{
        ...messageModules.Mutations,...blogModules.Mutations
    }
};