import User from "../../../models/UserModel.js";
import Post from "../../../models/PostModel.js";
import Conversation from "../../../models/ConversationModel.js";
export const userQueryResolvers = {
  getUsers: async (_,__,{user}) => {
    if(user.role!="ADMIN"){
      throw new Error("Unauthorized")
    }
    const users=await User.find();
    return users.map((user)=>({
      __typename:"User",
      id:user._id,
      email:user.email,
      userName:user.userName,
      isOnline:user.isOnline,
      posts:user.posts,
    }))
  },
  getUser: async (_, { userName }) => {
    const findUser =()=> new Promise(async(resolve, reject) => {
      const user=await User.findOne({userName})
      setTimeout(() => {
       resolve(user);
      }, 2000);
    });
    const user = await findUser();
    if (!user) {
      return {
        __typename: "UserError",
        message: "User not found",
        code: 404,
      };
    }
    return {
      __typename:"User",
      id:user._id,
      email:user.email,
      userName:user.userName,
      isOnline:user.isOnline,
      posts:user.posts,
    };
  },
  getMessageHistory:async (_, { userId },{user}) => {
    if(!user){
      throw new Error("Unauthenticated")
    }
    const currentUser=await currentUser.findOne({_id:userId}).populate("conversations");
    const populatedConversations= await Conversation.populate(currentUser.conversations, {
    path: "messages",
  });
    return populatedConversations[0].messages;
  },
};

export const postQueryResolvers = {
  getPosts: async() => await Post.find(),
  getPostsByUser: async (_, { userId }) => {
    const userPostsRetrival =()=> new Promise(async (resolve, reject) => {
      const userPosts=await Post.find({postedBy:userId});
      setTimeout(() => {
        resolve(userPosts);
      }, 2000);
    });
    const userPosts = await userPostsRetrival();
    return userPosts;
  },

  getPostComments: async (_, { postId }) => {
    const post = await Post.findOne({_id:postId}).populate("comments");
    return post.comments;
  },

  getPaginatedPosts: async (_, { limit, page }) => {
    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const startIdx = (page - 1) * limit;
    const items = await Post.aggregate([
      {
        $skip:startIdx
      },
      {
        $limit:limit
      },
      {
        $sort:{
          createdAt:1
        }
      }
    ])

    return {
      data: items,
      totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      currentPage: page,
    };
  },
};
