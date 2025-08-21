import { pubsub } from "../../../server/pubsub.js"

export const commentSubscriptionResolvers={
    commentAdded:{
        subscribe:(_,{postId})=>{
            return pubsub.asyncIterableIterator(`COMMENT_ADDED_${postId}`)
        }
    }
}

export const messageSubscriptionResolvers={
    userPresenceChanged:{
        subscribe:()=>{
            return pubsub.asyncIterableIterator(`USER_STATUS_CHANGED`);
        }
    }
}


