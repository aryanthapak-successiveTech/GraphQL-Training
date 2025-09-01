import { pubsub } from "../../../server/pubsub.js";
import User from "../../../models/UserModel.js";
import Post from "../../../models/PostModel.js";
import Comment from "../../../models/CommentModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userMutationsResolvers = {
  createUser: async (_, { userName, email, password, role }) => {
    const newUser = await User.create({
      userName,
      email,
      password,
      role,
    });
    return {
      __typename: "User",
      id: newUser._id,
      email: newUser.email,
      userName: newUser.userName,
      role: newUser.role,
      isOnline: newUser.isOnline,
    };
  },

  setUserOnline: (_, { email, isOnline }) => {
    const user = User.findOneAndUpdate(
      { email },
      { isOnline },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    pubsub.publish(`USER_STATUS_CHANGED`, {
      userPresenceChanged: {
        userId: user._id,
        isOnline,
      },
    });

    return {
      __typename: "User",
      ...user,
    };
  },

  editUser: async (_, { id, userName, email, role }) => {
    const updatedUser = await User.find({ email }, { userName, email, role });
    return updatedUser;
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new Error("Unauthorized");
    }

    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      __typename: "JWTPayload",
      token,
    };
  },
};

export const postMutationResolvers = {
  addPost: async (_, { userId, description }) => {
    const addedPost = await Post.create(
      {
        postedBy: userId,
        description,
      },
    );

    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          posts: addedPost._id,
        },
      }
    );

    return {
      id:addedPost._id,
      postedBy:addedPost.postedBy,
      description:addedPost.description,
      createdAt:addedPost.createdAt
    };
  },

  editPost: async (_, { postId, description }) => {
    const updatedPost = await User.findOneAndUpdate(
      { postId },
      { description },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedPost;
  },

  addComment: async (_, { postId, userId, text }) => {
      const newComment = await Comment.create(
        { commentedBy: userId, text },
      );
      await Post.findOneAndUpdate(
        { _id: postId },
        {
          $push: {
            comments: newComment._id,
          },
        },
      );
      pubsub.publish(`COMMENT_ADDED_${postId}`, {
        commentAdded: newComment,
      });

      return newComment;
  },
};
