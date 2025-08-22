import { blogModules } from "../modules/Assignment-3/blogs/index.js";
import { messageModules } from "../modules/Assignment-3/message/index.js";
import { comments, posts } from "../modules/Assignment-3/blogs/dataSource.js";

export const resolvers = {
  Query: {
    ...messageModules.Query,
    ...blogModules.Query,
  },
  Mutation: {
    ...messageModules.Mutations,
    ...blogModules.Mutations,
  },
  User: {
    posts: (parent, args, context) => {
      const userId = parent.email;
      const userPosts = posts.filter((post) => post.postedBy === userId);
      return userPosts;
    },
  },
  Post: {
    comments: (parent, args, context) => {
      const commentIds = new Set(parent.comments);
      const postComments = comments.filter((comment) =>
        commentIds.has(comment.id)
      );
      return postComments;
    },
  },

  Subscription: {
    ...blogModules.Subscriptions,
  },
};
