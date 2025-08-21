import { pubsub } from "../../../server/pubsub.js";
import { messages } from "../message/dataSource.js";
import { posts, users } from "./dataSource.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const userMutationsResolvers = {
  createUser: async (_, { userName, email, candidatePassword }) => {
    const hashedPassword = await bcrypt.hash(candidatePassword, 12);
    const user = {
      id: `${users.length + 1}`,
      email,
      userName,
      password: hashedPassword,
    };
    users.push(user);
    const { password, ...userData } = user;
    return {
      __typename: "User",
      ...userData,
    };
  },

  setUserOnline: (_, { email, isOnline }) => {
    const user = users.find((user) => user.email === email);
    user.isOnline = isOnline;
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    pubsub.publish(`USER_STATUS_CHANGED`, {
      userPresenceChanged: {
        userId: user.id,
        isOnline,
      },
    });
    return {
      __typename: "User",
      ...user,
    };
  },

  editUser: (_, { id, userName, email }) => {
    const user = users.find((user) => user.id === id);
    const updatedUser = { ...user, userName, email };
    return updatedUser;
  },

  login: async (_, { email, password }) => {
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error("User Not Found");
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new Error("Unauthorized");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return {
      __typename: "JWTPayload",
      token,
    };
  },
};

export const postMutationResolvers = {
  addPost: (_, { email, description }) => {
    const addedPost = {
      id: `${posts.length + 1}`,
      postedBy: email,
      description,
      createdAt: new Date().toISOString(),
    };

    posts.push(addedPost);

    return addedPost;
  },

  editPost: (_, { postId, description }) => {
    const post = posts.find((post) => post.id === postId);
    const updatedPost = { ...post, description };
    return updatedPost;
  },

  addComment: (_, { postId, email, text }) => {
    const post = posts.find((post) => post.id === postId);
    const comment = {
      id: `${postId}_${post.comments.length + 1}`,
      commentedBy: email,
      text,
    };
    if (!post.comments) {
      post.comments = [comment];
      pubsub.publish(`COMMENT_ADDED_${postId}`, {
        commentAdded: comment,
      });
      return comment;
    }
    post.comments.push(comment);

    pubsub.publish(`COMMENT_ADDED_${postId}`, {
      commentAdded: comment,
    });
    return comment;
  },
};
