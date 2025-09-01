import { blogModules } from "../modules/Assignment-3/blogs/index.js";
import { messageModules } from "../modules/Assignment-3/message/index.js";
import User from "../models/UserModel.js";
import Post from "../models/PostModel.js";

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
    posts: async (parent, args, context) => {
      const user = await User.findOne({ email: parent.email }).populate(
        "posts"
      );
      return user.posts;
    },
  },

  Post: {
    comments: async (parent, args, context) => {
      const post = await Post.findOne({ _id: parent.id }).populate("comments");
      console.log(post);
      return post.comments;
    },
  },

  PaginatedPosts: {
    data: async (parent) => {
      const posts = parent.data.map((post) => ({
        id: post._id,
        postedBy: post.postedBy,
        description: post.description,
        createdAt: post.createdAt,
      }));

      return posts;
    },

  },

  Subscription: {
    ...blogModules.Subscriptions,
  },
};
